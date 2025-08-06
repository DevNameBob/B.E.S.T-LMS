import styles from './TabToggle.module.css';

export default function TabToggle({ activeTab, onTabChange, tabs }) {
  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`${styles.tabButton} ${activeTab === tab.key ? styles.active : ''}`}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}