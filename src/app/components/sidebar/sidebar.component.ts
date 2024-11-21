import { Component, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type Theme = 'light' | 'dark' | 'system';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public readonly siteName = 'Your Site Name';
  public readonly isDarkMode = signal(false);
  public readonly currentTheme = signal<Theme>('system');
  public readonly isDropdownOpen = signal(false);
  public readonly themes: Theme[] = ['light', 'dark', 'system'];

  private systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)');

  public ngOnInit() {
    // Initial theme check
    this.updateTheme();

    // Listen for system theme changes
    this.systemThemeMedia.addEventListener('change', () => {
      if (this.currentTheme() === 'system') {
        this.updateTheme();
      }
    });
  }

  private updateTheme() {
    const theme = this.currentTheme();
    if (theme === 'system') {
      this.isDarkMode.set(this.systemThemeMedia.matches);
    } else {
      this.isDarkMode.set(theme === 'dark');
    }
  }

  public setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    this.isDropdownOpen.set(false);
    this.updateTheme();
  }

  public toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }
} 