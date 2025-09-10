using Microsoft.AspNetCore.Mvc;
using Lista_Tareas.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Lista_Tareas.Context;

namespace Lista_Tareas.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly ToDoListContext _context;

        public UsuarioController(ToDoListContext context)
        {
            _context = context;
        }

        [HttpPost("agregar")]
        public async Task<IActionResult> AgregarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                if (string.IsNullOrEmpty(usuario.Nombre) || string.IsNullOrEmpty(usuario.Email) || string.IsNullOrEmpty(usuario.Password))
                {
                    return BadRequest("Datos invalidos, debe de llenar todos los espacios del formulario");
                }
                var hasher = new PasswordHasher<Usuario>();
                usuario.Password = hasher.HashPassword(usuario, usuario.Password);
                _context.Usuarios.Add(usuario);
               
                await _context.SaveChangesAsync();
                return StatusCode(201 , "Usuario agregado correctamente");
            }
            catch (Exception ex)
            {
              return StatusCode(500 , "Error al agregar el usuario: " + ex.Message);
            }
          
        }
        [HttpPost("IniciarSesion")]
        public async Task<IActionResult> Entrar([FromBody] Login login)
        {
            try
            {
                var usuario = await _context.Usuarios.FirstOrDefaultAsync(u =>  u.Email == login.Email);
                if (usuario == null)
                {
                    return Unauthorized(new { success = false, message = "Los datos no son correctos" });
                }
                var hasher = new PasswordHasher<Usuario>();
                var resultado = hasher.VerifyHashedPassword(usuario , usuario.Password , login.Password);
                if (resultado == PasswordVerificationResult.Failed)
                {
                    return Unauthorized(new { success = false, message = "Usuario o contraseña incorrectos" });
                }
                return Ok(new { success = true, message = "Inicio de sesión exitoso" });
            }
            catch (Exception ex )
            {
                return StatusCode(500, new { success = false, message = "Error al iniciar sesión: " + ex.Message });
            }

        }
    }
}
