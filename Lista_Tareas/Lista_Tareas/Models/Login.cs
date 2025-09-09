using System.ComponentModel.DataAnnotations;

namespace Lista_Tareas.Models
{
    public class Login
    {
        [Required(AllowEmptyStrings = false)]
        public string? Password { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string? Email { get; set; }

    }
}
