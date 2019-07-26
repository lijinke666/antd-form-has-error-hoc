module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transformIgnorePatterns: ['/node_modules/', '.history/*'],
  modulePathIgnorePatterns: ['/.history/'],
  moduleDirectories: ['node_modules', '.', 'src', 'src/shared'],
  setupFilesAfterEnv: ['<rootDir>/setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}
