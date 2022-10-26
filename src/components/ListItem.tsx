import { Trash } from 'phosphor-react'
import { useState } from 'react'
import { Item } from '../page/Home'
import styles from './ListItem.module.css'

interface ListItemProps {
  item: Item
  handleTaskState: (id: string) => void
  handleDeleteTask: (id: string) => void
}

export function ListItem({
  item,
  handleTaskState,
  handleDeleteTask
}: ListItemProps) {
  const [isChecked, setIsChecked] = useState(item.done)

  const isDone = {
    base: {
      color: isChecked ? 'var(--gray-300)' : 'var(--gray-100)',
      textDecoration: isChecked ? 'line-through' : 'initial'
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <input
          type="checkbox"
          id={item.id}
          checked={isChecked}
          onChange={e => setIsChecked(e.target.checked)}
          onClick={() => handleTaskState(item.id)}
        />
        <label htmlFor={item.id} className={styles.checkbox}></label>
      </div>
      <label style={isDone.base} htmlFor={item.id}>
        {item.title}
      </label>

      <span className={styles.icon} onClick={() => handleDeleteTask(item.id)}>
        <Trash size={24} cursor="pointer" />
      </span>
    </div>
  )
}
