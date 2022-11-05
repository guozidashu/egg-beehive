import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA } from '@/config'

export async function login(data) {
  // if (loginRSA) {
  //   data = await encryptedData(data)
  // }
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}
export async function getVerify() {
  return request({
    url: '/verify',
    method: 'post',
    responseType: 'blob',
  })
}
export async function socialLogin(data) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo() {
  return request({
    url: '/userInfo',
    method: 'post',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data,
  })
}
