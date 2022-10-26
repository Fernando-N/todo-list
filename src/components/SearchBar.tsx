import { PlusCircle } from 'phosphor-react'
import { KeyboardEvent, useState } from 'react'

import styles from './SearchBar.module.css'

interface SearchBarProps {
  handleAddTask: (taskName: string) => void
}

export function SearchBar({ handleAddTask }: SearchBarProps) {
  const [inputText, setInputText] = useState('')

  function handleKeyUp(e: KeyboardEvent) {
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && inputText !== '') {
      handleAddTask(inputText)
      setInputText('')
    }
  }

  function handleInputText() {
    if (inputText !== '') {
      handleAddTask(inputText)
      setInputText('')
    }
  }

  return (
    <div className={styles.task}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button onClick={handleInputText}>
        Criar
        <PlusCircle size={20} />
      </button>
    </div>
  )
}
