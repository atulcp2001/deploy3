import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';

const Modal = ({ onClose }) => {
  const navigate = useNavigate();

  const onGoToLoginClicked = () => {
    navigate('/login');
    onClose();
  };

  return (
    <Transition.Root as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-60" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative z-50 bg-white rounded-lg px-4 pb-4 pt-5 text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Signup successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Congratulations! You have successfully completed the sign-up. You can now use your credentials to sign in.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={onGoToLoginClicked}
                >
                  Go to Sign In
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
