import * as Select from '@radix-ui/react-select'

type ChoiceProps = {
  id: string
  label: string
  value: string
  options: readonly { value: string; label: string }[]
  onChange: (value: string) => void
  disabled?: boolean
}

export function Choice({ id, label, value, options, onChange, disabled }: ChoiceProps) {
  return (
    <div className="field">
      <label id={`${id}-label`} htmlFor={id}>
        {label}
      </label>
      <Select.Root
        value={value}
        onValueChange={(nextValue) => {
          // The hidden form control can emit an empty value while synchronizing.
          if (options.some((option) => option.value === nextValue)) onChange(nextValue)
        }}
        disabled={disabled}
      >
        <Select.Trigger id={id} aria-labelledby={`${id}-label`} className="choice-trigger">
          <Select.Value>{options.find((option) => option.value === value)?.label}</Select.Value>
          <Select.Icon aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="choice-menu"
            position="popper"
            sideOffset={6}
            collisionPadding={16}
          >
            <Select.ScrollUpButton className="choice-scroll">Scroll up</Select.ScrollUpButton>
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value} className="choice-item">
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator aria-hidden="true">✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="choice-scroll">Scroll down</Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
