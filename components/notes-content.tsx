"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Trash2, Edit2, X, Check, Calendar, Tag } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
  color: string
}

export function NotesContent() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Variables and Data Types",
      content:
        "Key concepts:\n- Variables store data\n- Common types: int, string, float, boolean\n- Type conversion is important",
      category: "CS101",
      createdAt: "2024-10-15",
      updatedAt: "2024-10-15",
      color: "bg-blue-50",
    },
    {
      id: "2",
      title: "Loop Structures",
      content:
        "For loops: iterate over sequences\nWhile loops: repeat while condition is true\nDo-while: execute at least once",
      category: "CS101",
      createdAt: "2024-10-14",
      updatedAt: "2024-10-14",
      color: "bg-green-50",
    },
    {
      id: "3",
      title: "Integration by Parts",
      content: "Formula: ∫u dv = uv - ∫v du\nChoose u and dv carefully\nOften used for polynomial × exponential",
      category: "MATH201",
      createdAt: "2024-10-12",
      updatedAt: "2024-10-12",
      color: "bg-purple-50",
    },
    {
      id: "4",
      title: "Shakespeare's Themes",
      content:
        "Love, betrayal, ambition, mortality\nSonnets explore unrequited love\nTragedies examine power and corruption",
      category: "ENG102",
      createdAt: "2024-10-10",
      updatedAt: "2024-10-10",
      color: "bg-orange-50",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: "", content: "", category: "" })

  const categories = Array.from(new Set(notes.map((n) => n.category)))
  const colors = ["bg-blue-50", "bg-green-50", "bg-purple-50", "bg-orange-50", "bg-pink-50", "bg-yellow-50"]

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || note.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateNote = () => {
    if (formData.title.trim() && formData.content.trim() && formData.category.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        category: formData.category,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
        color: colors[Math.floor(Math.random() * colors.length)],
      }
      setNotes([newNote, ...notes])
      setFormData({ title: "", content: "", category: "" })
      setIsCreating(false)
    }
  }

  const handleUpdateNote = (id: string) => {
    if (formData.title.trim() && formData.content.trim() && formData.category.trim()) {
      setNotes(
        notes.map((note) =>
          note.id === id
            ? {
                ...note,
                title: formData.title,
                content: formData.content,
                category: formData.category,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : note,
        ),
      )
      setEditingId(null)
      setFormData({ title: "", content: "", category: "" })
    }
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const handleEditNote = (note: Note) => {
    setEditingId(note.id)
    setFormData({ title: note.title, content: note.content, category: note.category })
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingId(null)
    setFormData({ title: "", content: "", category: "" })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Notes</h1>
          <p className="text-slate-600">Create and manage your personal study notes</p>
        </div>
        {!isCreating && !editingId && (
          <Button onClick={() => setIsCreating(true)} className="bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        )}
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <Card className="p-6 border-2 border-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">{editingId ? "Edit Note" : "Create New Note"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <Input
                placeholder="Note title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category (Course Code)</label>
              <Input
                placeholder="e.g., CS101, MATH201"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
              <Textarea
                placeholder="Write your notes here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => (editingId ? handleUpdateNote(editingId) : handleCreateNote())}
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                {editingId ? "Update" : "Create"}
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Search and Filters */}
      {!isCreating && !editingId && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search notes by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={selectedCategory === null ? "bg-slate-900" : ""}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={selectedCategory === category ? "bg-slate-900" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Notes Grid */}
      {!isCreating && !editingId && (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            {filteredNotes.length} note{filteredNotes.length !== 1 ? "s" : ""} found
          </p>

          {filteredNotes.length === 0 ? (
            <Card className="p-12 text-center">
              <Tag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">No notes found</p>
              <Button onClick={() => setIsCreating(true)} className="bg-slate-900 hover:bg-slate-800 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Note
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <Card
                  key={note.id}
                  className={`p-6 ${note.color} border-l-4 border-slate-900 hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline">{note.category}</Badge>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                        title="Edit note"
                      >
                        <Edit2 className="w-4 h-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{note.title}</h3>
                  <p className="text-sm text-slate-700 mb-4 line-clamp-4 whitespace-pre-wrap">{note.content}</p>

                  <div className="flex items-center justify-between text-xs text-slate-600 pt-4 border-t border-slate-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <span className="text-slate-500">{note.content.split(" ").length} words</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
