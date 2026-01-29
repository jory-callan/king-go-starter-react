import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: string
  username: string
  email?: string
  avatar?: string
  role?: string
  createdAt?: string
}

/**
 * 用户登录凭证
 */
export interface AuthCredentials {
  token: string
  refreshToken?: string
  expiresAt?: number
}

/**
 * 用户状态类型
 */
type UserState = {
  // 用户信息
  userInfo: UserInfo | null
  // 登录状态
  isLogin: boolean
  // 登录凭证
  authCredentials: AuthCredentials | null
}

/**
 * 用户操作类型
 */
type UserActions = {
  // 登录
  login: (username: string, password: string) => Promise<void>
  // 登出
  logout: () => void
  // 更新用户信息
  updateUserInfo: (userInfo: Partial<UserInfo>) => void
  // 更新凭证
  updateCredentials: (credentials: Partial<AuthCredentials>) => void
  // 清除凭证（保留用户信息）
  clearCredentials: () => void
}

/**
 * 用户全局状态管理
 * 使用 persist 中间件实现持久化存储
 */
export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      // 初始状态
      userInfo: null,
      isLogin: false,
      authCredentials: null,

      // 登录操作
      login: async (username, password) => {
        try {
          set({
            userInfo: {
              id: "1",
              username: "admin",
              email: "<EMAIL>",
              avatar: "https://avatars.githubusercontent.com/u/1011681?v=4",
              role: "admin",
              createdAt: "2025-04-01T00:00:00.000Z",
            },
            isLogin: true,
            authCredentials: {
              token: "fake-token",
              refreshToken: "fake-refreshtoken",
              expiresAt: Date.now() + 3600 * 1000,
            },
          })
        //   const res = await mockLoginApi(username, password)
        //   set({
        //     userInfo: res.userInfo,
        //     isLogin: true,
        //     authCredentials: res.credentials,
        //   })
        } catch (error) {
          console.error("Login failed:", error)
          throw error
        }
      },
      // 登出操作
      logout: async () => {
        try {
          // await authApi.logout()
        } finally {
          set({
            userInfo: null,
            isLogin: false,
            authCredentials: null,
          })
        }
      },
      // 更新用户信息
      updateUserInfo: (updates) =>
        set((state) => ({
          userInfo: state.userInfo ? { ...state.userInfo, ...updates } : null,
        })),

      // 更新凭证
      updateCredentials: (updates) =>
        set((state) => ({
          authCredentials: state.authCredentials
            ? { ...state.authCredentials, ...updates }
            : null,
        })),

      // 清除凭证
      clearCredentials: () =>
        set({
          authCredentials: null,
        }),
    }),
    {

      name: "user-storage", // 本地存储的 key
      storage: createJSONStorage(() => localStorage), // 显式指定存储方式
      // 需要持久化的字段
      partialize: (state) => ({
        userInfo: state.userInfo,
        isLogin: state.isLogin,
        authCredentials: state.authCredentials,
      }),
    }
  )
)

// 导出便捷的 hooks
export const selectUser = (state: UserState) => state.userInfo
export const selectIsLogin = (state: UserState) => state.isLogin
export const selectAuthCredentials = (state: UserState) => state.authCredentials
