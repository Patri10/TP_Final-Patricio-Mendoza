using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using API_Wallet.Datos;
using API_Wallet.Models;

namespace API_Wallet.Controllers
{
    public class TransaccionsController : Controller
    {
        private readonly Contextdb _context;

        public TransaccionsController(Contextdb context)
        {
            _context = context;
        }

        // GET: Transaccions
        [HttpGet]
        [Route("api/transacciones")]
        public async Task<IActionResult> GetTransacciones()
        {
            var transacciones = await _context.Transaccion
                .Include(t => t.moneda)
                .ToListAsync();
            return Ok(transacciones);
        }

        // GET: Transaccions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var transaccion = await _context.Transaccion
                .Include(t => t.moneda)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (transaccion == null)
            {
                return NotFound();
            }

            return View(transaccion);
        }

        // GET: Transaccions/Create
        public IActionResult Create()
        {
            ViewData["MonedaId"] = new SelectList(_context.Monedas, "Id", "Id");
            return View();
        }

        // POST: Transaccions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Route("api/transaccions")]
        public async Task<IActionResult> GuardarTransaccionDesdeJS([FromBody] Transaccion transaccion)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var moneda = await _context.Monedas.FindAsync(transaccion.MonedaId);
            if (moneda == null)
                return NotFound($"Moneda con ID {transaccion.MonedaId} no existe.");

            transaccion.FechaHora = DateTime.Now; 
            _context.Transaccion.Add(transaccion);
            await _context.SaveChangesAsync();

            return Ok(transaccion);
        }

        // GET: Transaccions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var transaccion = await _context.Transaccion.FindAsync(id);
            if (transaccion == null)
            {
                return NotFound();
            }
            ViewData["MonedaId"] = new SelectList(_context.Monedas, "Id", "Id", transaccion.MonedaId);
            return View(transaccion);
        }

        // POST: Transaccions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Tipo,MontoARS,FechaHora,MonedaId")] Transaccion transaccion)
        {
            if (id != transaccion.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(transaccion);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TransaccionExists(transaccion.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["MonedaId"] = new SelectList(_context.Monedas, "Id", "Id", transaccion.MonedaId);
            return View(transaccion);
        }

        // GET: Transaccions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var transaccion = await _context.Transaccion
                .Include(t => t.moneda)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (transaccion == null)
            {
                return NotFound();
            }

            return View(transaccion);
        }

        // POST: Transaccions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var transaccion = await _context.Transaccion.FindAsync(id);
            if (transaccion != null)
            {
                _context.Transaccion.Remove(transaccion);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TransaccionExists(int id)
        {
            return _context.Transaccion.Any(e => e.Id == id);
        }
    }
}
