import FileItem from '@/components/ui/FileItem';
import getCourseCompletionPercentage from '@/utils/get-course-completion-percentage';
import RelatedCertificate from '../RelatedCertificate';
import RelatedNotes from '../RelatedNotes';
import styles from './RelatedFiles.module.scss';
import type { RelatedFilesTypes } from './RelatedFiles.types';

const RelatedFiles = ({ course, courses_progress, left_handed, notes, full_name, authorName }: RelatedFilesTypes) => {
  const completionPercentage = getCourseCompletionPercentage(courses_progress);
  const files = left_handed ? course.files_alter : course.files;

  return (
    <section
      id='materialy-do-pobrania'
      className={styles['RelatedFiles']}
    >
      <h2>Materiały do pobrania</h2>
      <div className={styles.container}>
        <FilesColumn heading='Instrukcje do kursu'>
          {files?.length ? (
            files?.map((el, i) => (
              <FileItem
                file={el}
                key={i}
              />
            ))
          ) : (
            <p className={styles.empty}>Brak instrukcji do pobrania</p>
          )}
        </FilesColumn>
        <FilesColumn heading='Twoje Pliki'>
          {!!notes.length && (
            <RelatedNotes
              notes={notes}
              courseName={course.name}
            />
          )}

          <RelatedCertificate
            course={course}
            full_name={full_name}
            authorName={authorName}
            completionPercentage={completionPercentage}
          />
        </FilesColumn>
      </div>
    </section>
  );
};

export default RelatedFiles;

const FilesColumn = ({ heading, children }: { heading: string; children: React.ReactNode }) => {
  return (
    <div>
      <h3>{heading}</h3>
      <div className={styles.list}>{children}</div>
    </div>
  );
};
