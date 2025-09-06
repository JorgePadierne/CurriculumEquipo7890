using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerHolaMundo.Models;

namespace ServerHolaMundo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly Models.UsuariosLogContext _context;
        public UsuarioController(Models.UsuariosLogContext context)
        {
            _context = context;
        }
        [HttpPost("agregar")]
        public IActionResult CrearUsuario([FromBody] Models.Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
            return Ok(usuario);
        }
       
        [HttpGet]
        [Route("Buscar")]
        public IActionResult Buscarusuario([FromQuery] string user)
        {
            var usuario = _context.Usuarios.FirstOrDefault(_context => _context.User == user);
            if (usuario == null)
            {
                return NotFound("Usuario no encontrado");
            }
            return Ok($"El correo electronico del usuario {usuario.User} es {usuario.Email}");
        }
        [HttpGet("Buscar@")]
        public IActionResult BuscarEmail([FromQuery] string email)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.Email == email);
                if (email == null)
            {
                return NotFound("Correo electronico no encontrado");
            }
            return Ok($"El usuario {usuario.User} es propietario del correo electronico {usuario.Email}");
        }
        [HttpDelete("Eliminar")]
        public IActionResult EliminarUsuario([FromBody] UsuarioDelete delete)
        {
            if (string.IsNullOrEmpty(delete.User) || string.IsNullOrEmpty(delete.Password) || string.IsNullOrEmpty(delete.Email))
            {
                return BadRequest("Datos invalidos");
            }
            var BuscarUsuario = _context.Usuarios.FirstOrDefault(u => u.User == delete.User && u.Email == delete.Email && u.Password == delete.Password);
            if (BuscarUsuario == null)
            {
                return NotFound("Usuario no encontrado");
            }
            _context.Usuarios.Remove(BuscarUsuario);
            _context.SaveChangesAsync();

            return Ok($"Usuario {BuscarUsuario.User} eliminado");
        }
    }
}
