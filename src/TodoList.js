import React, { useState } from 'react'
import { Input, Button, List } from '@hi-ui/hiui'
import './TodoList.css'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [searchText, setSearchText] = useState('')

  // 验证输入是否为空
  const validateInput = (value) => {
    if (!value || !value.trim()) {
      alert('请输入你的待办事项')
      return false
    }
    return true
  }

  // 添加 todo
  const handleAddTodo = () => {
    if (!validateInput(inputValue)) return
    
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    }
    setTodos([...todos, newTodo])
    setInputValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  // 删除 todo
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // 完成 todo
  const handleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: true } : todo))
  }

  // 开始编辑
  const handleEdit = (id, text) => {
    setEditingId(id)
    setEditValue(text)
  }

  // 保存编辑
  const handleSave = (id) => {
    if (!validateInput(editValue)) return
    
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editValue.trim() } : todo
    ))
    setEditingId(null)
    setEditValue('')
  }

  // 取消编辑
  const handleCancel = () => {
    setEditingId(null)
    setEditValue('')
  }

  // 查询功能
  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()))

  const todoList = filteredTodos.filter(todo => !todo.completed)
  const completedList = filteredTodos.filter(todo => todo.completed)

  return (
    <div className="todo-container">
      <h2>Todo List Demo</h2>
      <div className="todo-header">
        <Input
          placeholder="请输入待办事项"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button type="primary" onClick={handleAddTodo}>添加</Button>
      </div>
      <div className="todo-search">
        <Input
          placeholder="搜索事项"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
      <div className="todo-section">
        <h4 className="todo-section-title">待办事项</h4>
        <List
          data={todoList}
          render={(item, ref) => (
            <div className="todo-item" ref={ref}>
              {editingId === item.id ? (
                <>
                  <Input
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    className="todo-item-input"
                  />
                  <div className="todo-item-buttons">
                    <Button type="primary" size="sm" className="todo-item-button" onClick={() => handleSave(item.id)}>保存</Button>
                    <Button type="line" size="sm" className="todo-item-button" onClick={handleCancel}>取消</Button>
                  </div>
                </>
              ) : (
                <>
                  <span className="todo-item-text">{item.text}</span>
                  <div className="todo-item-actions">
                    <Button type="success" size="sm" className="todo-item-button" onClick={() => handleComplete(item.id)}>完成</Button>
                    <Button type="line" size="sm" className="todo-item-button" onClick={() => handleEdit(item.id, item.text)}>编辑</Button>
                    <Button type="danger" size="sm" className="todo-item-button" onClick={() => handleDelete(item.id)}>删除</Button>
                  </div>
                </>
              )}
            </div>
          )}
          emptyContent={<span>暂无待办事项</span>}
        />
      </div>
      <div className="todo-section">
        <h4 className="todo-section-title">已完成事项</h4>
        <List
          data={completedList}
          render={(item, ref) => (
            <div className="todo-item" ref={ref}>
              <span className="todo-item-completed">{item.text}</span>
              <Button type="danger" size="sm" className="todo-item-button" onClick={() => handleDelete(item.id)}>删除</Button>
            </div>
          )}
          emptyContent={<span>暂无已完成事项</span>}
        />
      </div>
    </div>
  )
}

export default TodoList
