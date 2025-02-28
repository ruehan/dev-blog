import React from 'react';

export const extractTextFromNode = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (node === null || node === undefined) return '';
  
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join('');
  }
  
  if (React.isValidElement(node)) {
    return extractTextFromNode(node.props.children);
  }
  
  return '';
};

export const generateId = (text: string): string => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')         // 공백을 하이픈으로 변환
    .replace(/[^\w\u0100-\uFFFF\u3131-\uD79D\-]+/g, '')  // 영문, 숫자, 한글, 기타 유니코드 문자, 하이픈만 유지
    .replace(/\-\-+/g, '-')       // 연속된 하이픈을 하나로 변환
    .replace(/^-+/, '')           // 시작 부분의 하이픈 제거
    .replace(/-+$/, '')           // 끝 부분의 하이픈 제거
    .trim();                      // 앞뒤 공백 제거
};

export const generateIdFromNode = (node: React.ReactNode): string => {
  const text = extractTextFromNode(node);
  
  if (!text || text.trim() === '') {
    return `heading-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  return generateId(text);
};