using Lista_Tareas.Context;
using Lista_Tareas.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lista_Tareas.Controllers
{
    [ApiController]
    [Route("api2/[controller]")]
    public class ListaController : ControllerBase
    {
        public readonly ToDoListContext _Context;

        public ListaController(ToDoListContext context)
        {
            _Context = context;
        }


        [HttpPost("AgregarTarea")]
        public async Task<IActionResult> AgregarTarea(Listatarea recibirTarea)
        {
            try
            {
                var tarea = await _Context.Listatareas.AddAsync(recibirTarea);
                await _Context.SaveChangesAsync();
                return StatusCode(201, "Tarea agregada exitosamente");
            }
            catch (Exception ex)
            {
                return StatusCode(500, " Error al agregar la tarea: " + ex.Message);
            }
          
        }


        [HttpGet("RecibirTareas")]
        public async Task<IActionResult> DevolverTareas()
        {
            try
            {
                var Tareas = await _Context.Listatareas.ToListAsync();
                return Ok(Tareas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        
        }


        [HttpDelete("EliminarTareas/{id}")]
        public async Task<IActionResult> EliminarTarea(int id)
        {
            try
            {
                var Tarea = await _Context.Listatareas.FindAsync(id);
                if (Tarea == null)
                {
                    return NotFound();
                }
                _Context.Listatareas.Remove(Tarea);
                await _Context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
         
        }

        [HttpPatch("ActualizarTareas/{id}")]
        public async Task<IActionResult> ActualizarTareas(int id, [FromBody] Listatarea listatarea)
        {
            try
            {
                var Tarea = await _Context.Listatareas.FindAsync(id);
                if (Tarea == null) return NotFound();
                Tarea.Tarea = listatarea.Tarea;
                Tarea.Descripcion = listatarea.Descripcion;
                await _Context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {

                return StatusCode(500 , ex.Message);
            }
          
        }

    }
}
