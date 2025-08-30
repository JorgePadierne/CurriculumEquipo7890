using System;
using System.Collections.Generic;

namespace ServerHolaMundo.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string User { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Email { get; set; }
}
