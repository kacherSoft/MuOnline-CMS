/**
 * Character Detail Modal Component
 * Displays and allows editing character stats
 */

import React, { useState } from 'react';
import type { CharacterDetails, UpdateCharacterRequest } from '../../types/admin-types';

interface CharacterDetailModalProps {
  character: CharacterDetails | null;
  isEditing: boolean;
  onClose: () => void;
  onUpdate: (data: UpdateCharacterRequest) => Promise<void>;
}

export function CharacterDetailModal({ character, isEditing, onClose, onUpdate }: CharacterDetailModalProps) {
  const [editData, setEditData] = useState<UpdateCharacterRequest>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!character) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onUpdate(editData);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof UpdateCharacterRequest, value: number) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  return React.createElement(
    'div',
    {
      className: 'fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4',
      onClick: onClose,
    },
    React.createElement(
      'div',
      {
        className: `
          bg-slate-800 border border-slate-700 rounded-lg
          max-w-lg w-full max-h-[90vh] overflow-hidden
          flex flex-col
        `,
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
      },
      React.createElement(
        'div',
        { className: 'flex items-center justify-between p-6 border-b border-slate-700' },
        React.createElement(
          'div',
          { className: 'flex items-center gap-3' },
          React.createElement('span', { className: 'text-3xl' }, getClassIcon(character.class)),
          React.createElement(
            'div',
            null,
            React.createElement('h2', { className: 'text-xl font-bold text-white' }, character.name),
            React.createElement('p', { className: 'text-slate-400 text-sm' }, `Account: ${character.account}`)
          )
        ),
        React.createElement(
          'button',
          {
            onClick: onClose,
            className: 'text-slate-400 hover:text-white text-2xl',
          },
          '×'
        )
      ),

      React.createElement(
        'form',
        { onSubmit: handleSubmit, className: 'flex-1 overflow-y-auto p-6 scrollbar-dark' },
        React.createElement(
          'div',
          { className: 'space-y-4' },
          renderStatInput('Level', character.level, 'level', editData.level, handleChange, isEditing),
          renderStatInput('Resets', character.resets, 'resets', editData.resets, handleChange, isEditing),
          renderStatInput('Strength', character.strength, 'strength', editData.strength, handleChange, isEditing),
          renderStatInput('Dexterity', character.dexterity, 'dexterity', editData.dexterity, handleChange, isEditing),
          renderStatInput('Vitality', character.vitality, 'vitality', editData.vitality, handleChange, isEditing),
          renderStatInput('Energy', character.energy, 'energy', editData.energy, handleChange, isEditing),
          character.leadership > 0 &&
            renderStatInput('Leadership', character.leadership, 'leadership', editData.leadership, handleChange, isEditing)
        ),

        React.createElement(
          'div',
          { className: 'flex gap-3 mt-6 pt-6 border-t border-slate-700' },
          React.createElement(
            'button',
            {
              type: 'button',
              onClick: onClose,
              disabled: isSubmitting,
              className: `
                flex-1 px-4 py-2 bg-slate-700 text-white rounded
                hover:bg-slate-600 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              `,
            },
            'Cancel'
          ),
          Object.keys(editData).length > 0 &&
            React.createElement(
              'button',
              {
                type: 'submit',
                disabled: isSubmitting,
                className: `
                  flex-1 px-4 py-2 bg-amber-500 text-black font-medium rounded
                  hover:bg-amber-400 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                `,
              },
              isSubmitting ? 'Saving...' : 'Save Changes'
            )
        )
      )
    )
  );
}

function renderStatInput(
  label: string,
  value: number,
  field: keyof UpdateCharacterRequest,
  editValue: number | undefined,
  onChange: (field: keyof UpdateCharacterRequest, value: number) => void,
  isEditable: boolean
) {
  return React.createElement(
    'div',
    { className: 'flex items-center justify-between' },
    React.createElement(
      'label',
      { className: 'text-slate-400 text-sm' },
      label
    ),
    React.createElement(
      'div',
      { className: 'flex items-center gap-3' },
      React.createElement(
        'span',
        { className: 'text-white font-mono' },
        value.toLocaleString()
      ),
      isEditable &&
        React.createElement('input', {
          type: 'number',
          min: 0,
          value: editValue !== undefined ? editValue : '',
          onChange: (e) => onChange(field, parseInt(e.target.value) || 0),
          placeholder: 'New value',
          className: `
            w-28 px-3 py-1.5 bg-slate-700 border border-slate-600
            rounded text-white text-sm focus:outline-none focus:border-amber-500
          `,
        })
    )
  );
}

function getClassIcon(classNum: number): string {
  const icons: Record<number, string> = {
    0: '⚔️',
    1: '🛡️',
    2: '🏹',
    3: '✨',
    16: '🗡️',
    17: '🔮',
    18: '🌀',
    19: '🌙',
    32: '👑',
    33: '🦁',
    48: '🎭',
    64: '🔥',
    65: '💧',
    66: '🌿',
    80: '🌟',
  };
  return icons[classNum] || '⚔️';
}
