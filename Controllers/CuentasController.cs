using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskSharpHTTP.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace TaskSharpHTTP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : Controller
    {
        
        private readonly MyContext _context;
        public CuentasController(MyContext context)
        {
            _context=context;
      
        }
        //GET: api/product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CuentaItem>>> GetProducto()
        {
            return await _context.CuentaItems.ToListAsync();
        }


        //Get: api/product:id
        [HttpGet("{id}")]
        public async Task<ActionResult<CuentaItem>> GetProducto(int id)
        {
            var productitem = await _context.CuentaItems.FindAsync(id);
            if (productitem==null)
            {
                return NotFound();
            }
            return productitem;
        }
        [HttpGet("buscar")]
        public async Task<List<CuentaItem>> Buscarproducto(string nombre)
        {
            var productitem = await _context.CuentaItems.FromSql("SELECT * FROM CHART WHERE ACCNO LIKE '{0}%' OR DESCRIPTION LIKE '%{0}%'",nombre).ToListAsync();
          
            return productitem;
        }

        [HttpGet("buscarcategoria")]
        public async Task<List<CuentaItem>> Buscarcategoria(string categoria)
        {
            var productitem = await _context.CuentaItems.Where(p => p.Codigo == categoria).ToListAsync();
          
            return productitem;
        }

        //Post: api/product
        [HttpPost]
        public async Task<ActionResult<CuentaItem>> PostProducto(CuentaItem productItem)
        {
            _context.CuentaItems.Add(productItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProducto), new { id = productItem.Codigo }, productItem);
        }
        
        }
   
}