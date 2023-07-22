import styles from './page.module.scss';

export default function Page() {
  return (
    <div className={styles.div}>
      <h1>Note-Taking. Simplified</h1>
      <h2>Previous Notes:</h2>
      <label>
        {' '}
        Search Notes
        <input />
      </label>
    </div>
  );
}
