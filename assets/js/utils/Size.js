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

export const getObjectXPositionningData = (camera, sizes, object, matrix) => {
  const box = new Box3()
  box.copy(object.geometry.boundingBox).applyMatrix4(matrix)

  const { left: windowLeft, width: windowWidth } = getXPositionningDataAtZ(object.position.z, camera, sizes)
  const size = new Vector3()
  box.getSize(size)
  const width = get(size, 'x')

  return { width, windowLeft, windowWidth }
}
