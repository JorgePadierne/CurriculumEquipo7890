using Microsoft.AspNetCore.Mvc;

namespace ServerHolaMundo.Controllers
{
    [ApiController]
  
    public class UsuarioController : ControllerBase
    {
        private readonly Models.UsuariosLogContext _context;
        public UsuarioController(Models.UsuariosLogContext context)
        {
            _context = context;
        }
        [HttpPost("/agregar")]
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
            return Ok(usuario);
        }
        [HttpGet("Buscar@")]
        public IActionResult BuscarEmail([FromQuery] string email)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.Email == email);
                if (email == null)
            {
                return NotFound("Correo electronico no encontrado");
            }
            return Ok(usuario);
        }
            
    }
}
