// utils/formatPhoneRu.ts
export function formatPhoneRu(input: string): string {
  // берём все цифры из текущего input.value
  const allDigits = input.replace(/\D/g, '')
  // если первая цифра — 7 (из префикса), отбрасываем её
  const stripped = allDigits.startsWith('7')
    ? allDigits.slice(1)
    : allDigits
  // ограничиваем до 10 цифр (после кода страны)
  const d = stripped.slice(0, 10)

  // начинаем всегда с префикса
  let res = '+7 '

  // если хоть что-то ввели — открываем скобку
  if (d.length > 0) {
    res += '(' + d.substring(0, Math.min(3, d.length))
    // как только ввели 3 цифры — закрываем скобку
    if (d.length >= 3) {
      res += ')'
    }
  }

  // теперь группируем остальные цифры
  if (d.length > 3) {
    res += ' ' + d.substring(3, Math.min(6, d.length))
  }
  if (d.length > 6) {
    res += '-' + d.substring(6, Math.min(8, d.length))
  }
  if (d.length > 8) {
    res += '-' + d.substring(8, Math.min(10, d.length))
  }

  return res
}
