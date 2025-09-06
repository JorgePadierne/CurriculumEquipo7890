using Microsoft.Identity.Client;

namespace ServerHolaMundo.Models
{
    public class UsuarioDelete
    {
        public string? User {  get; set; }   
        public string? Password { get; set; }
        public string? Email { get; set; }

    }
}
