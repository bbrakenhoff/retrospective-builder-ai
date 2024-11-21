import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
 public readonly siteName = 'Your Site Name';
 public readonly isDarkMode = signal(false);

  public toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }
} 