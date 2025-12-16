'use client';

import { useState } from 'react';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Bold, Italic, Link as LinkIcon, List, ListOrdered, Code } from 'lucide-react';

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('write');

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const renderPreview = () => {
    return (
      <div className="prose prose-neutral dark:prose-invert max-w-none p-4 min-h-[400px]">
        {value.split('\n').map((line, i) => {
          if (line.startsWith('# ')) {
            return <h1 key={i}>{line.substring(2)}</h1>;
          } else if (line.startsWith('## ')) {
            return <h2 key={i}>{line.substring(3)}</h2>;
          } else if (line.startsWith('### ')) {
            return <h3 key={i}>{line.substring(4)}</h3>;
          } else if (line.startsWith('- ') || line.startsWith('* ')) {
            return <li key={i}>{line.substring(2)}</li>;
          } else if (line.trim() === '') {
            return <br key={i} />;
          } else {
            return <p key={i}>{line}</p>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b bg-muted/30">
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center gap-1 py-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('**', '**')}
                className="h-8 w-8 p-0"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('*', '*')}
                className="h-8 w-8 p-0"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('[', '](url)')}
                className="h-8 w-8 p-0"
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('- ')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('1. ')}
                className="h-8 w-8 p-0"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertMarkdown('`', '`')}
                className="h-8 w-8 p-0"
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>
            <TabsList>
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="write" className="m-0">
          <Textarea
            id="markdown-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Write your content in Markdown...'}
            className="min-h-[400px] border-0 rounded-none focus-visible:ring-0 font-mono text-sm resize-none"
          />
        </TabsContent>
        <TabsContent value="preview" className="m-0">
          {renderPreview()}
        </TabsContent>
      </Tabs>
    </div>
  );
}
