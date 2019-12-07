using Microsoft.EntityFrameworkCore;

namespace TaskSharpHTTP.Models
{
    public class MyContext:DbContext
    {
        public MyContext(DbContextOptions<MyContext>  options) :
base (options)
{
}
public DbSet <CuentaItem> CuentaItems { get ; set ;}

    }
}