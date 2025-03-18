import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from './Projects';
import { projectList } from '../data/projects';

describe('Projects Component', () => {
  test('renders project list', () => {
    render(<Projects />);

    projectList.forEach(project => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });
  });
}); 