using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Lista_Tareas.Models;

public partial class Listatarea
{

    public int Id { get; set; }
    [Required(AllowEmptyStrings = false)]
    public string? Tarea { get; set; }
    [Required(AllowEmptyStrings = false)]
    public string? Descripcion { get; set; }
}
