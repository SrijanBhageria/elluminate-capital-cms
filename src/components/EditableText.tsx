'use client';

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  multiline?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  disableDoubleClick?: boolean;
}

export interface EditableTextRef {
  triggerEdit: () => void;
}

export const EditableText = forwardRef<EditableTextRef, EditableTextProps>(({
  value,
  onSave,
  className = '',
  style = {},
  placeholder = 'Click to edit',
  multiline = false,
  tag = 'span',
  disableDoubleClick = false
}, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const elementRef = useRef<HTMLElement>(null);

  // Expose method to trigger editing externally
  const triggerEdit = () => {
    setIsEditing(true);
  };

  useImperativeHandle(ref, () => ({
    triggerEdit
  }));

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Cleanup tooltip on unmount
  useEffect(() => {
    return () => {
      setIsHovered(false);
    };
  }, []);

  const handleDoubleClick = () => {
    if (!disableDoubleClick) {
      setIsEditing(true);
    }
  };

  const handleMouseEnter = () => {
    console.log('Mouse enter - setting hovered to true');
    setIsHovered(true);
    if (elementRef.current && !disableDoubleClick) {
      const rect = elementRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Calculate tooltip position
      let top = rect.top - 60; // More space above
      let left = rect.left + rect.width / 2;
      
      // Ensure tooltip doesn't go off screen
      if (top < 10) {
        top = rect.bottom + 10; // Show below if no space above
      }
      if (left < 100) {
        left = 100; // Ensure tooltip doesn't go off left edge
      }
      if (left > viewportWidth - 100) {
        left = viewportWidth - 100; // Ensure tooltip doesn't go off right edge
      }
      
      console.log('Tooltip position:', { top, left });
      setTooltipPosition({ top, left });
    }
  };

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <InputComponent
        ref={inputRef as any}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={`editable-input ${className}`}
        style={{
          ...style,
          minHeight: multiline ? '60px' : 'auto',
          resize: multiline ? 'vertical' : 'none',
        }}
        placeholder={placeholder}
      />
    );
  }

  const TagComponent = tag as any;
  return (
    <>
      <TagComponent
        ref={elementRef}
        className={`editable-text ${className} ${isHovered ? 'hovered' : ''}`}
        style={{ 
          ...style, 
          position: 'relative',
          cursor: disableDoubleClick ? 'default' : 'pointer',
          border: isHovered && !disableDoubleClick ? '2px dashed rgba(255, 255, 255, 0.8)' : '2px solid transparent',
          borderRadius: isHovered && !disableDoubleClick ? '4px' : '0',
          padding: isHovered && !disableDoubleClick ? '2px 4px' : '0',
          backgroundColor: isHovered && !disableDoubleClick ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          transition: 'all 0.2s ease'
        }}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => {
          console.log('Mouse leave - setting hovered to false');
          setIsHovered(false);
        }}
      >
        {value || placeholder}
      </TagComponent>
      {isHovered && !disableDoubleClick && typeof window !== 'undefined' && createPortal(
        <div 
          className="editable-tooltip"
          style={{
            position: 'fixed',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: 'translateX(-50%)',
            zIndex: 99999,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            maxWidth: 'none',
            minWidth: 'max-content',
            background: 'rgba(0, 0, 0, 0.95)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            lineHeight: '1.2',
            letterSpacing: '0.3px',
            textAlign: 'center'
          }}
        >
          Double-click to edit
        </div>,
        document.body
      )}
    </>
  );
});
