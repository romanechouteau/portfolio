import { Box3, Vector3 } from 'three'
import { get } from 'lodash'

export const getSizeAtZ = (z, camera, sizes) => {
  const cameraZ = camera.position.z
  const distance = cameraZ - z

  const aspect = sizes.width / sizes.height
  const vFov = camera.fov * Math.PI / 180

  const height = 2 * Math.tan(vFov / 2) * distance
  const width = height * aspect
  return { width, height }
}

export const getXPositionningDataAtZ = (z, camera, sizes) => {
  const cameraZ = camera.position.z
  const distance = cameraZ - z

  const aspect = sizes.width / sizes.height
  const vFov = camera.fov * Math.PI / 180

  const height = 2 * Math.tan(vFov / 2) * distance
  const width = height * aspect
  return { left: -(width / 2), width }
}

export const getYPositionningDataAtZ = (z, camera) => {
  const cameraZ = camera.position.z
  const distance = cameraZ - z

  const vFov = camera.fov * Math.PI / 180

  const height = 2 * Math.tan(vFov / 2) * distance
  return { top: (height / 2), height }
}

export const getObjectDimensions = (object, matrix) => {
  const box = new Box3()
  box.copy(object.geometry.boundingBox).applyMatrix4(matrix)

  const size = new Vector3()
  box.getSize(size)
  const width = get(size, 'x')
  const height = get(size, 'y')

  return { width, height }
}

export const getObjectXPositionningData = (camera, sizes, object, matrix) => {
  const { left: windowLeft, width: windowWidth } = getXPositionningDataAtZ(object.position.z, camera, sizes)
  const { width } = getObjectDimensions(object, matrix)

  return { width, windowLeft, windowWidth }
}

export const getObjectYPositionningData = (camera, object, matrix) => {
  const { top: windowTop, height: windowHeight } = getYPositionningDataAtZ(object.position.z, camera)
  const { height } = getObjectDimensions(object, matrix)

  return { height, windowTop, windowHeight }
}
