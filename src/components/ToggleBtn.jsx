export default function ToggleBtn({
  checked = false,
  onChange,
  labelChecked = 'On',
  labelUnchecked = 'Off',
  disabled = false,
  id,
}) {
  return (
    <label htmlFor={id} className='inline-flex items-center cursor-pointer'>
      <input
        id={id}
        type='checkbox'
        className='sr-only peer'
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500" />
      <span className={`ml-3 text-sm font-medium ${checked ? 'text-green-700' : 'text-amber-700'}`}>
        {checked ? labelChecked : labelUnchecked}
      </span>
    </label>
  )
}
