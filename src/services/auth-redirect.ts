export function getSafeRedirectPath(value: FormDataEntryValue | null) {
  if (typeof value !== 'string' || !value.startsWith('/')) {
    return '/dashboard'
  }

  if (value.startsWith('//') || value.startsWith('/login')) {
    return '/dashboard'
  }

  return value
}
