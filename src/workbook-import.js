// Validate user-supplied workbook shapes before replacing the active calculator.
(function () {
  function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function isValidCell(cell) {
    if (!isRecord(cell)) return false;
    if (cell.f !== undefined && cell.f !== null && typeof cell.f !== 'string') return false;
    if (cell.v !== undefined && cell.v !== null && !['string', 'number', 'boolean'].includes(typeof cell.v)) return false;
    return typeof cell.v !== 'number' || Number.isFinite(cell.v);
  }

  window.NW_VALIDATE_WORKBOOK = function validateWorkbookImport(input) {
    if (!isRecord(input) || !Array.isArray(input.sheets) ||
        input.sheets.length === 0 || input.sheets.length > 20) return false;

    const names = new Set();
    for (const sheet of input.sheets) {
      if (!isRecord(sheet) || typeof sheet.name !== 'string' || !sheet.name.trim() ||
          names.has(sheet.name) || !isRecord(sheet.cells) ||
          !Number.isInteger(sheet.maxRow) || sheet.maxRow < 1 || sheet.maxRow > 2000 ||
          !Number.isInteger(sheet.maxCol) || sheet.maxCol < 1 || sheet.maxCol > 200) return false;
      names.add(sheet.name);
      const cells = Object.entries(sheet.cells);
      if (cells.length > 20000 || !cells.every(([address, value]) =>
        /^[A-Z]{1,3}[1-9]\d{0,3}$/.test(address) && isValidCell(value))) return false;
    }
    return true;
  };
})();
