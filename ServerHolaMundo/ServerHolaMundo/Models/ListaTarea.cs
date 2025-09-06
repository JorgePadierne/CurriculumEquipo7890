using System;
using System.Collections.Generic;

namespace ServerHolaMundo.Models;

public partial class ListaTarea
{
    public int Id { get; set; }

    public string Tarea { get; set; } = null!;

    public bool? Realizada { get; set; }
}
