import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Text Areas allow users to enter and edit multiple lines of text.

---

**Usage Guidance**
- Use the Text Area component when you need to let users enter an amount of text that's longer than a single line.
- To ensure we don't overwhelm users, there shouldn't be more than two Text Areas on a page.
- For all Text Areas on Web, a user clicking into a field or label that's not disabled will trigger the text cursor to appear, allowing users the ability to type. As the user types in the Text Area, the placeholder text is replaced with the user's input.

---

**When to Use**
- Use the Text Area to fit longer text descriptions, usually around one paragraph.

**When to Use Something Else**
- Use a **Rich Text Editor** to give users the ability to format text.
- Use a **Text Input** for a single line of text.

---

**Types**
- **Default** — standard resizable textarea
- **Tags** — a field that accepts freeform tag chips; press Enter or comma to add a tag, Backspace to remove the last one

**States**
- **Placeholder** — empty field with placeholder hint
- **Filled** — contains user input
- **Focus** — blue border ring when active
- **Error** — red border, error-coloured helper text
- **Disabled** — muted fill and text, not interactive
        `.trim(),
      },
    },
  },
  argTypes: {
    type:     { control: 'select', options: ['default', 'tags'] },
    label:    { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
    rows:     { control: 'number' },
    helpIcon: { control: 'boolean' },
    error:    { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Text Area Label',
    placeholder: 'Text area placeholder...',
    helperText: 'This text gives further instructions.',
    type: 'default',
    rows: 4,
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Placeholder</span>
        <TextArea
          label="Text Area Label"
          placeholder="Text area placeholder..."
          helperText="This text gives further instructions."
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Filled</span>
        <TextArea
          label="Text Area Label"
          defaultValue="A long time ago in a galaxy far, far away..."
          helperText="This text gives further instructions."
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Error</span>
        <TextArea
          label="Text Area Label"
          defaultValue="A long time ago in a galaxy far, far away..."
          error
          helperText="This field cannot exceed 500 characters."
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Disabled</span>
        <TextArea
          label="Text Area Label"
          defaultValue="A long time ago in a galaxy far, far away..."
          disabled
          helperText="This text gives further instructions."
        />
      </div>
    </div>
  ),
};

// ─── Tags ─────────────────────────────────────────────────────────────────────

export const Tags: Story = {
  name: 'Tags Type',
  parameters: { controls: { disable: true } },
  render: () => {
    const [tags, setTags] = useState(['Vanesa', 'Nathan', 'Ty', 'Josh', 'Ramon']);
    const [errorTags, setErrorTags] = useState(['Vanesa', 'Nathan']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Placeholder</span>
          <TextArea
            type="tags"
            label="Text Area Label"
            placeholder="Add tags..."
            helperText="This text gives further instructions."
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Filled</span>
          <TextArea
            type="tags"
            label="Text Area Label"
            placeholder="Add tags..."
            tags={tags}
            onTagsChange={setTags}
            helperText="This text gives further instructions."
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Error</span>
          <TextArea
            type="tags"
            label="Text Area Label"
            placeholder="Add tags..."
            tags={errorTags}
            onTagsChange={setErrorTags}
            error
            helperText="Maximum of 5 tags allowed."
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--ds-color-text-tertiary)' }}>Disabled</span>
          <TextArea
            type="tags"
            label="Text Area Label"
            placeholder="Add tags..."
            defaultTags={['Vanesa', 'Nathan']}
            disabled
            helperText="This text gives further instructions."
          />
        </div>
      </div>
    );
  },
};

// ─── With Help Icon ───────────────────────────────────────────────────────────

export const WithHelpIcon: Story = {
  name: 'With Help Icon',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 360 }}>
      <TextArea
        label="Project description"
        helpIcon
        placeholder="Describe the project goals and scope..."
        helperText="This will be visible to all team members."
      />
      <TextArea
        label="Notes"
        helpIcon
        defaultValue="Follow up with client on Monday."
        helperText="Internal notes are not shared externally."
        disabled
      />
    </div>
  ),
};

// ─── In a Form ────────────────────────────────────────────────────────────────

export const InAForm: Story = {
  name: 'In a Form',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => {
    const [assignees, setAssignees] = useState<string[]>([]);
    return (
      <form
        onSubmit={e => e.preventDefault()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          width: 400,
          padding: 24,
          borderRadius: 12,
          border: '1px solid var(--ds-color-border-subtle)',
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--ds-color-text-primary)', marginBottom: 4 }}>
          New Task
        </div>
        <TextArea
          label="Description"
          placeholder="What needs to be done?"
          helperText="Be specific — include acceptance criteria if applicable."
          rows={4}
        />
        <TextArea
          type="tags"
          label="Assignees"
          helpIcon
          placeholder="Type a name and press Enter..."
          tags={assignees}
          onTagsChange={setAssignees}
          helperText="Add one or more team members."
        />
        <TextArea
          label="Blocked by"
          placeholder="List any blockers..."
          rows={2}
          error
          helperText="At least one blocker must be resolved before starting."
        />
      </form>
    );
  },
};
