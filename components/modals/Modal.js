import styles from './Modal.module.scss'
import { useComponentVisible } from '@hooks/index';
import { Icons } from "@components/index";

const Modal = ({ children }) => {

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    return (
    <>
    { isComponentVisible && 
        <div 
            className={styles.container}
            ref={ref}
        >   
            <button            
                className={styles.close}
                onClick={() => setIsComponentVisible(false)}
            >
                <Icons
                    name="close"
                    width={20}
                    height={20}
                />
            </button>

            {children}

        </div>
    }
    </>
    )
  }

export default Modal;