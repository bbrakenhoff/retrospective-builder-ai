import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

type Theme = 'light' | 'dark' | 'system';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule, SvgIconComponent],
	templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
	private static readonly LOCALSTORAGE_KEY = 'theme';

	public readonly siteName = 'Your Site Name';
	public readonly isDarkMode = signal(false);
	public readonly currentTheme = signal<Theme>('system');
	public readonly isDropdownOpen = signal(false);
	public readonly themes: Theme[] = ['light', 'dark', 'system'];

	private systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)');

	public constructor() {
		const savedTheme = this.getSavedTheme();
		this.currentTheme.set(savedTheme);
		this.updateTheme();
	}

	public ngOnInit() {
		this.systemThemeMedia.addEventListener('change', () => {
			if (this.currentTheme() === 'system') {
				this.updateTheme();
			}
		});
	}

	private getSavedTheme(): Theme {
		try {
			const savedTheme = localStorage.getItem(SidebarComponent.LOCALSTORAGE_KEY);
			return (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')
				? savedTheme as Theme
				: 'system';
		} catch {
			return 'system';
		}
	}

	private saveTheme(theme: Theme) {
		try {
			localStorage.setItem(SidebarComponent.LOCALSTORAGE_KEY, theme);
		} catch (error) {
			console.error('Error saving theme:', error);
		}
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
		this.saveTheme(theme);
		this.updateTheme();
	}

	public toggleDropdown() {
		this.isDropdownOpen.update(v => !v);
	}

	public getThemeText(): string {
		return this.currentTheme() || 'system';
	}

	public getThemeIcon(theme: Theme): string {
		let iconName='system';

		if(theme === 'light'){ iconName = 'sun';}
		else if(theme==='dark'){ iconName = 'moon';}

		return `assets/icon-${iconName}.svg`;
	}
} 