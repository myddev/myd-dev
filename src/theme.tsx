import { theme, type ThemeConfig } from 'antd';

export const getModernSlateTheme = (mode: 'light' | 'dark'): ThemeConfig => {
  const isDarkMode = mode === 'dark';
  const { darkAlgorithm, defaultAlgorithm } = theme;

  return {
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    token: {
      // (기존 token 설정은 그대로 유지)
      colorPrimary: isDarkMode ? '#6981F4' : '#4A65F2',
      colorSuccess: isDarkMode ? '#29A66B' : '#1DBF73',
      colorWarning: isDarkMode ? '#FFB323' : '#FFC043',
      colorError: isDarkMode ? '#FF6B7C' : '#F54B5E',
      colorInfo: isDarkMode ? '#4EB5F5' : '#27A1F2',

      colorBgContainer: isDarkMode ? '#1E293B' : '#FFFFFF', 
      colorBgLayout: isDarkMode ? '#111827' : '#F8FAFC', // 전체 레이아웃의 배경색
      
      colorTextBase: isDarkMode ? '#E5E7EB' : '#1F2937',
    },
    components: {
      Button: {
        colorPrimary: isDarkMode ? '#6981F4' : '#4A65F2',
        algorithm: true,
      },

      Layout: {
        headerBg: isDarkMode ? '#1E293B' : '#FFFFFF', // Header 배경색
        siderBg: isDarkMode ? '#1E293B' : '#FFFFFF', // Sider 배경색
        headerPadding: '0 24px', // Header 패딩
        triggerBg: isDarkMode ? '#2d3e54' : '#E5E7EB', // Sider 접기/펴기 버튼 배경색
        triggerColor: isDarkMode ? '#E5E7EB' : '#1F2937', // Sider 접기/펴기 버튼 아이콘 색상
      },

      Menu: {
        darkItemBg: '#1E293B', // 다크 모드일 때 메뉴 아이템의 기본 배경
        itemBg: isDarkMode ? '#1E293B' : '#FFFFFF', // 메뉴 아이템 배경색
        itemColor: isDarkMode ? '#CBD5E1' : '#334155', // 메뉴 아이템 텍스트 색상
        itemHoverColor: isDarkMode ? '#FFFFFF' : '#000000', // 메뉴 아이템 hover 시 텍스트 색상
        itemSelectedBg: isDarkMode ? '#4A65F2' : '#E0E7FF', // 선택된 메뉴 아이템 배경색
        itemSelectedColor: isDarkMode ? '#FFFFFF' : '#4A65F2', // 선택된 메뉴 아이템 텍스트 색상
      },
    },
  };
};

export const getVibrantTealTheme = (mode: 'light' | 'dark'): ThemeConfig => {
  const isDarkMode = mode === 'dark';
  const { darkAlgorithm, defaultAlgorithm } = theme;

  // 기본 색상 및 선택 색상을 변수로 지정
  const primaryColor = isDarkMode ? '#5EEAD4' : '#14B8A6';
  const selectedItemBg = isDarkMode ? '#0D9488' : '#CCFBF1';
  const selectedItemColor = isDarkMode ? '#FFFFFF' : '#0F766E';

  return {
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: primaryColor,
      colorSuccess: isDarkMode ? '#4ADE80' : '#22C55E',
      colorWarning: isDarkMode ? '#FBBF24' : '#F59E0B',
      colorError: isDarkMode ? '#F87171' : '#EF4444',
      colorInfo: isDarkMode ? '#60A5FA' : '#3B82F6',

      colorBgContainer: isDarkMode ? '#1E293B' : '#FFFFFF', // 콘텐츠(Card, Modal 등) 배경
      colorBgLayout: isDarkMode ? '#0F172A' : '#F8FAFC',    // 전체 Layout 배경
      
      colorTextBase: isDarkMode ? '#F1F5F9' : '#1E293B',
    },
    components: {
      Button: {
        colorPrimary: primaryColor,
        algorithm: true, // 파생 색상 자동 계산
      },
      Layout: {
        headerBg: isDarkMode ? '#1E293B' : '#FFFFFF',
        siderBg: isDarkMode ? '#1E293B' : '#FFFFFF',
        triggerBg: isDarkMode ? '#334155' : '#E0F2F1',
        triggerColor: isDarkMode ? '#E2E8F0' : '#14B8A6',
      },
      Menu: {
        darkItemBg: '#1E293B', // 다크모드 전용 옵션
        itemBg: isDarkMode ? '#1E293B' : '#FFFFFF',
        itemColor: isDarkMode ? '#94A3B8' : '#475569',
        itemHoverColor: isDarkMode ? '#FFFFFF' : '#14B8A6',
        itemSelectedBg: selectedItemBg,
        itemSelectedColor: selectedItemColor,
      },
    },
  };
};

export const getElegantIndigoTheme = (mode: 'light' | 'dark'): ThemeConfig => {
  const isDarkMode = mode === 'dark';
  const { darkAlgorithm, defaultAlgorithm } = theme;

  // 기본 색상 및 선택 색상을 변수로 지정
  const primaryColor = isDarkMode ? '#818CF8' : '#6366F1';
  const selectedItemBg = isDarkMode ? '#4F46E5' : '#EEF2FF';
  const selectedItemColor = isDarkMode ? '#FFFFFF' : '#4338CA';

  return {
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: primaryColor,
      colorSuccess: isDarkMode ? '#6EE7B7' : '#34D399',
      colorWarning: isDarkMode ? '#FCD34D' : '#FBBF24',
      colorError: isDarkMode ? '#FB7185' : '#F43F5E',
      colorInfo: isDarkMode ? '#7DD3FC' : '#38BDF8',

      colorBgContainer: isDarkMode ? '#334155' : '#FFFFFF', // 콘텐츠(Card, Modal 등) 배경
      colorBgLayout: isDarkMode ? '#1E293B' : '#F9FAFB',    // 전체 Layout 배경
      
      colorTextBase: isDarkMode ? '#CBD5E1' : '#334155',
    },
    components: {
      Button: {
        colorPrimary: primaryColor,
        algorithm: true, // 파생 색상 자동 계산
      },
      Layout: {
        headerBg: isDarkMode ? '#334155' : '#FFFFFF',
        siderBg: isDarkMode ? '#334155' : '#FFFFFF',
        triggerBg: isDarkMode ? '#4338CA' : '#E0E7FF',
        triggerColor: isDarkMode ? '#E0E7FF' : '#4F46E5',
      },
      Menu: {
        darkItemBg: '#334155', // 다크모드 전용 옵션
        itemBg: isDarkMode ? '#334155' : '#FFFFFF',
        itemColor: isDarkMode ? '#94A3B8' : '#475569',
        itemHoverColor: isDarkMode ? '#FFFFFF' : '#6366F1',
        itemSelectedBg: selectedItemBg,
        itemSelectedColor: selectedItemColor,
      },
    },
  };
};

export const getForestGreenTheme = (mode: 'light' | 'dark'): ThemeConfig => {
  const isDarkMode = mode === 'dark';
  const { darkAlgorithm, defaultAlgorithm } = theme;

  const primaryColor = isDarkMode ? '#4ADE80' : '#16A34A';
  const selectedItemBg = isDarkMode ? '#166534' : '#DCFCE7';
  const selectedItemColor = isDarkMode ? '#FFFFFF' : '#15803D';

  return {
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: primaryColor,
      colorSuccess: isDarkMode ? '#4ADE80' : '#16A34A', // Primary와 동일하게 사용
      colorWarning: isDarkMode ? '#FBBF24' : '#F59E0B',
      colorError: isDarkMode ? '#F87171' : '#DC2626',
      colorInfo: isDarkMode ? '#60A5FA' : '#3B82F6',

      colorBgContainer: isDarkMode ? '#1F2937' : '#FFFFFF',
      colorBgLayout: isDarkMode ? '#111827' : '#F9FAFB',
      
      colorTextBase: isDarkMode ? '#D1D5DB' : '#374151',
    },
    components: {
      Button: {
        colorPrimary: primaryColor,
        algorithm: true,
      },
      Layout: {
        headerBg: isDarkMode ? '#1F2937' : '#FFFFFF',
        siderBg: isDarkMode ? '#1F2937' : '#FFFFFF',
        triggerBg: isDarkMode ? '#374151' : '#F3F4F6',
        triggerColor: isDarkMode ? '#D1D5DB' : '#16A34A',
      },
      Menu: {
        darkItemBg: '#1F2937',
        itemBg: isDarkMode ? '#1F2937' : '#FFFFFF',
        itemColor: isDarkMode ? '#9CA3AF' : '#4B5563',
        itemHoverColor: isDarkMode ? '#FFFFFF' : primaryColor,
        itemSelectedBg: selectedItemBg,
        itemSelectedColor: selectedItemColor,
      },
    },
  };
};

export const getGraphiteGrayTheme = (mode: 'light' | 'dark'): ThemeConfig => {
  const isDarkMode = mode === 'dark';
  const { darkAlgorithm, defaultAlgorithm } = theme;

  // Primary는 포인트 색상으로 사용
  const primaryColor = isDarkMode ? '#60A5FA' : '#3B82F6'; 
  // 선택된 아이템 배경 (무채색으로 변경)
  const selectedItemBg = isDarkMode ? '#404040' : '#F3F4F6'; // neutral-700
  const selectedItemColor = isDarkMode ? primaryColor : primaryColor; 

  // --- 변경된 색상 ---
  // 1. 다크 모드 배경 (순수 회색 계열로 변경)
  const darkBgLayout = '#171717'; // neutral-900
  const darkBgContainer = '#262626'; // neutral-800
  
  return {
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: primaryColor,
      colorSuccess: isDarkMode ? '#29A66B' : '#22C55E',
      colorWarning: isDarkMode ? '#FBBF24' : '#F59E0B',
      colorError: isDarkMode ? '#F87171' : '#DC2626',
      colorInfo: primaryColor, 

      colorBgContainer: isDarkMode ? darkBgContainer : '#FFFFFF',
      colorBgLayout: isDarkMode ? darkBgLayout : '#F9FAFB',
      
      colorTextBase: isDarkMode ? '#E5E7EB' : '#1F2937',
    },
    components: {
      Button: {
        colorPrimary: primaryColor,
        algorithm: true,
      },
      Layout: {
        headerBg: isDarkMode ? darkBgContainer : '#FFFFFF',
        siderBg: isDarkMode ? darkBgContainer : '#FFFFFF',
        triggerBg: isDarkMode ? selectedItemBg : '#F3F4F6',
        triggerColor: isDarkMode ? '#9CA3AF' : '#6B7280',
      },
      Menu: {
        itemBg: isDarkMode ? darkBgContainer : '#FFFFFF',
        itemColor: isDarkMode ? '#9CA3AF' : '#4B5563',
        itemHoverColor: isDarkMode ? '#FFFFFF' : '#000000',
        itemSelectedBg: selectedItemBg,
        itemSelectedColor: selectedItemColor,
      },
    },
  };
};

export const getWarmUmberTheme = (mode: 'light' | 'dark'): ThemeConfig => {
  const isDarkMode = mode === 'dark';
  const { darkAlgorithm, defaultAlgorithm } = theme;

  const primaryColor = isDarkMode ? '#FB923C' : '#EA580C';
  const selectedItemBg = isDarkMode ? '#9A3412' : '#FFEDD5';
  const selectedItemColor = isDarkMode ? '#FFFFFF' : '#9A3412';

  return {
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: primaryColor,
      colorSuccess: isDarkMode ? '#4ADE80' : '#16A34A',
      colorWarning: isDarkMode ? '#FB923C' : '#EA580C', // Primary와 동일하게 사용
      colorError: isDarkMode ? '#F87171' : '#DC2626',
      colorInfo: isDarkMode ? '#60A5FA' : '#3B82F6',

      colorBgContainer: isDarkMode ? '#292524' : '#FFFFFF',
      colorBgLayout: isDarkMode ? '#1C1917' : '#FEFCE8',
      
      colorTextBase: isDarkMode ? '#E7E5E4' : '#44403C',
    },
    components: {
      Button: {
        colorPrimary: primaryColor,
        algorithm: true,
      },
      Layout: {
        headerBg: isDarkMode ? '#292524' : '#FFFFFF',
        siderBg: isDarkMode ? '#292524' : '#FFFFFF',
        triggerBg: isDarkMode ? '#44403C' : '#FFFBEB',
        triggerColor: isDarkMode ? '#D6D3D1' : '#B45309',
      },
      Menu: {
        darkItemBg: '#292524',
        itemBg: isDarkMode ? '#292524' : '#FFFFFF',
        itemColor: isDarkMode ? '#A8A29E' : '#57534E',
        itemHoverColor: isDarkMode ? '#FFFFFF' : primaryColor,
        itemSelectedBg: selectedItemBg,
        itemSelectedColor: selectedItemColor,
      },
    },
  };
};