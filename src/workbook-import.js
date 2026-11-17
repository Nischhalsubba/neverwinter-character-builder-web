// Only load workbook formulas that match the bundled trusted templates.
// A user-supplied formula reaches the calculator's JavaScript Function evaluator.
(function () {
  function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function isValidCell(cell, trustedCell) {
    if (!isRecord(cell) || !isRecord(trustedCell)) return false;
    if (cell.f !== trustedCell.f) return false;
    if (cell.v !== undefined && cell.v !== null &&
        !['string', 'number', 'boolean'].includes(typeof cell.v)) return false;
    return typeof cell.v !== 'number' || Number.isFinite(cell.v);
  }

  window.NW_VALIDATE_WORKBOOK = function validateWorkbookImport(input, trustedSheets) {
    if (!isRecord(input) || !Array.isArray(input.sheets) ||
        !Array.isArray(trustedSheets) || trustedSheets.length === 0 ||
        trustedSheets.length > 20 || input.sheets.length !== trustedSheets.length) return false;

    for (let i = 0; i < input.sheets.length; i += 1) {
      const sheet = input.sheets[i];
      const template = trustedSheets[i];
      if (!isRecord(sheet) || !isRecord(template) ||
          sheet.name !== template.name ||
          !isRecord(sheet.cells) || !isRecord(template.cells) ||
          sheet.maxRow !== template.maxRow ||
          sheet.maxCol !== template.maxCol ||
          !Number.isInteger(sheet.maxRow) || sheet.maxRow < 1 || sheet.maxRow > 2000 ||
          !Number.isInteger(sheet.maxCol) || sheet.maxCol < 1 || sheet.maxCol > 200) return false;

      const cells = Object.entries(sheet.cells);
      if (cells.length > 20000 || !cells.every(([address, value]) =>
        /^[A-Z]{1,3}[1-9]\d{0,3}$/.test(address) &&
        isValidCell(value, template.cells[address]))) return false;

      // Removing formula cells would silently disable the shipped calculations.
      if (Object.entries(template.cells).some(([address, value]) =>
        isRecord(value) && typeof value.f === 'string' &&
        (!isRecord(sheet.cells[address]) || sheet.cells[address].f !== value.f))) return false;
    }
    return true;
  };
})();
