// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Button, Dialog, Field, Input, toast, Toaster } from './index';

// jsdom doesn't implement <dialog>'s modal API; polyfill just enough to assert
// the open-prop reflection. Browsers provide the real thing.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

describe('<Button>', () => {
  it('keeps its accessible name and disables while loading', () => {
    render(<Button loading>Save</Button>);
    const btn = screen.getByRole('button', { name: 'Save' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });
});

describe('<Field>', () => {
  it('announces an error via role=alert', () => {
    render(
      <Field label="Email" error="Already invited.">
        <Input defaultValue="sam@example" />
      </Field>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Already invited.');
  });
});

describe('<Dialog>', () => {
  it('reflects the open prop on the native dialog', () => {
    const { rerender, container } = render(
      <Dialog open={false} onClose={() => {}} title="Confirm">body</Dialog>,
    );
    const dialog = container.querySelector('dialog')!;
    expect(dialog.open).toBe(false);
    rerender(
      <Dialog open onClose={() => {}} title="Confirm">body</Dialog>,
    );
    expect(dialog.open).toBe(true);
  });
});

describe('toast()', () => {
  it('shows and auto-dismisses', () => {
    vi.useFakeTimers();
    try {
      render(<Toaster />);
      act(() => {
        toast('Saved');
      });
      expect(screen.getByText('Saved')).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(4500);
      });
      expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
