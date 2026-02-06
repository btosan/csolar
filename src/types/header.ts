export interface NavLink {
    id: number;
    name: string;
    link: string;
  }
  
  export interface UserData {
    firstName?: string;
    lastName?: string;
    name?: string;
    username?: string;
    image?: string;
    role?: string;
  }
  
  export interface HeaderProps {
    currentTheme?: string;
    theme?: string;
    setTheme: (theme: string) => void;
  }