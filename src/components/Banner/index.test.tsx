import { render, screen } from '@testing-library/react';
import { Banner } from '.';
import { describe, expect, it } from 'vitest';

describe('Banner Component', () => {
  it('renders banner image', () => {
    render(<Banner />);

    const bannerImage = screen.getByAltText("Burguer's banner");
    expect(bannerImage).toBeInTheDocument();

    expect(bannerImage).toHaveAttribute('src', expect.stringContaining('/images/banner/banner.png'));
  });
})
