using Microsoft.EntityFrameworkCore;
using ServerHolaMundo.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuraci�n de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
// Servicios
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<UsuariosLogContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConectionSQL")));


var app = builder.Build();

app.UseCors("AllowReactApp");
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
