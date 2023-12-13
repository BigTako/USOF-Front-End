import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ModalMenu } from './ui/ModalMenu';
import { Tooltip } from './ui/Tooltip';

import GlobalStyles from './styles/GlobalStyles';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
import { PostsSelectProvider } from './contexts/PostsSelectContext';
import { Toaster } from 'react-hot-toast';
import AccountActivationPage from './pages/AccountActivationPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import AppLayout from './pages/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';
import PasswordResetPage from './pages/PasswordResetPage';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { CommentsSelectProvider } from './contexts/CommentsSelectContext';
import UpdateUserPage from './pages/UpdateUserPage';

function App() {
  return (
    <DarkModeProvider>
      <ModalMenu>
        <Tooltip>
          <PostsSelectProvider>
            <CommentsSelectProvider>
              <GlobalStyles />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<AppLayout />}>
                    <Route index element={<Navigate replace to="posts" />} />
                    <Route path="posts">
                      <Route index element={<HomePage />} />
                      <Route
                        path="create"
                        element={
                          <ProtectedRoute restrictedTo={['user', 'admin']}>
                            <CreatePostPage />
                          </ProtectedRoute>
                        }
                      ></Route>
                      <Route
                        path="update/:id"
                        element={
                          <ProtectedRoute restrictedTo={['user', 'admin']}>
                            <CreatePostPage type="update" />
                          </ProtectedRoute>
                        }
                      ></Route>
                      <Route path=":id" element={<PostPage />}></Route>
                    </Route>
                    <Route
                      path="me"
                      element={
                        <ProtectedRoute restrictedTo={['user', 'admin']}>
                          <ProfilePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="me/update"
                      element={
                        <ProtectedRoute restrictedTo={['user', 'admin']}>
                          <UpdateUserPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="admin"
                      element={
                        <ProtectedRoute restrictedTo={['admin']}>
                          <AdminPage />
                        </ProtectedRoute>
                      }
                    ></Route>
                    <Route
                      path="/resetPassword/:token"
                      element={<PasswordResetPage />}
                    />
                    <Route
                      path="/account-activation/:token"
                      element={<AccountActivationPage />}
                    />
                    <Route path="*" element={<NotFoundPage />}></Route>
                  </Route>
                </Routes>
              </BrowserRouter>
              <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: '8px' }}
                toastOptions={{
                  success: {
                    duration: 3 * 1000,
                  },
                  error: {
                    duration: 5 * 1000,
                  },
                  style: {
                    fontSize: '16px',
                    maxWidth: '500px',
                    padding: '16px 24px',
                    backgroundColor: 'var(--color-grey-0',
                    color: 'var(--color-grey-700)',
                  },
                }}
              />
            </CommentsSelectProvider>
          </PostsSelectProvider>
        </Tooltip>
      </ModalMenu>
    </DarkModeProvider>
  );
}

export default App;
