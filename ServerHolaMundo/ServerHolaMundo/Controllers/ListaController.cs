using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerHolaMundo.Models;

namespace ServerHolaMundo.Controllers
{
    [ApiController]
    [Route("ToDoList/[controller]")]
    public class ListaController : ControllerBase
    {
        private readonly UsuariosLogContext ListaContext;

        public ListaController(UsuariosLogContext context)
        {
            ListaContext = context;
        }


        [HttpGet("VerTareas")]
        public async Task<IActionResult> VerTareas()
        {
            var tareas = await ListaContext.ListaTareas.ToListAsync();
            return Ok(tareas);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTarea([FromBody] ListaTarea tarea)
        {
            if (tarea == null)
            {
                return BadRequest("La tarea no puede ser nula");
            }

            try
            {
                await ListaContext.ListaTareas.AddAsync(tarea);
                await ListaContext.SaveChangesAsync();
                return Ok(tarea);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al guardar la tarea: {ex.Message}");
            }
        }
        [HttpDelete("EliminarTarea/{id}")]
        public async Task<IActionResult> EliminarTarea(int id)
        {
            var BuscarTarea = await ListaContext.ListaTareas.FindAsync( id );
            if (BuscarTarea == null)
            {
                return NotFound("Tarea no encontrada");
            }
            ListaContext.ListaTareas.Remove(BuscarTarea);
            await ListaContext.SaveChangesAsync();
            return Ok($"Tarea {BuscarTarea.Tarea} eliminada");
        }
        [HttpPatch("ActualizarTarea/{id}")]
        public async Task<IActionResult> ActualizarTarea(int id ,[FromBody] ListaTarea dto)
        {
            if (dto == null || dto.Id <= 0)
                return BadRequest("Datos inválidos");

            var tarea = await ListaContext.ListaTareas.FindAsync(dto.Id);
            if (tarea == null)
                return NotFound("Tarea no encontrada");

            tarea.Realizada = dto.Realizada;
            await ListaContext.SaveChangesAsync();

            return Ok($"Tarea {tarea.Tarea} actualizada");
        }


    }
}
