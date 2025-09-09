using System;
using System.Collections.Generic;

namespace Lista_Tareas.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? Nombre { get; set; }

    public string? Password { get; set; }

    public string? Email { get; set; }
}
