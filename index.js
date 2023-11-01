const glob = require('fast-glob')

const globstar = (pattern) => `**/${pattern}`

const EMPTY_STRING = ''

 
function manualBlocklist() {
  // TODO: honor the .gitignore file instead of a hard-coded list
  return [
    '.DS_Store',
    '.circleci',
    '.git',
    '.gitignore',
    '.nvmrc',
    '.nyc_output',
    'bower_components',
    'jspm_packages',
    'node_modules',
    'vendor',
  ]
}

function globBlocklist(){
  // TODO: honor the .gitignore file instead of a hard-coded list
  return [
    '__pycache__',
    'node_modules/**/*',
    'vendor',
    '.circleci',
    '.git',
    '.gitignore',
    '.nvmrc',
    '.nyc_output',
    '.tox',
    '*.am',
    '*.bash',
    '*.bat',
    '*.bw',
    '*.cfg',
    '*.class',
    '*.cmake',
    '*.cmake',
    '*.conf',
    '*.coverage',
    '*.cp',
    '*.cpp',
    '*.crt',
    '*.css',
    '*.csv',
    '*.csv',
    '*.data',
    '*.db',
    '*.dox',
    '*.ec',
    '*.ec',
    '*.egg',
    '*.egg-console.log',
    '*.el',
    '*.env',
    '*.erb',
    '*.exe',
    '*.ftl',
    '*.gif',
    '*.go',
    '*.gradle',
    '*.gz',
    '*.h',
    '*.html',
    '*.in',
    '*.jade',
    '*.jar*',
    '*.jpeg',
    '*.jpg',
    '*.js',
    '*.less',
    '*.log',
    '*.m4',
    '*.mak*',
    '*.map',
    '*.marker',
    '*.md',
    '*.o',
    '*.p12',
    '*.pem',
    '*.png',
    '*.pom*',
    '*.profdata',
    '*.proto',
    '*.ps1',
    '*.pth',
    '*.py',
    '*.pyc',
    '*.pyo',
    '*.rb',
    '*.rsp',
    '*.rst',
    '*.ru',
    '*.sbt',
    '*.scss',
    '*.scss',
    '*.serialized',
    '*.sh',
    '*.snapshot',
    '*.sql',
    '*.svg',
    '*.tar.tz',
    '*.template',
    '*.ts',
    '*.whl',
    '*.xcconfig',
    '*.xcoverage.*',
    '*/classycle/report.xml',
    '*codecov.yml',
    '*~',
    '.*coveragerc',
    '.coverage*',
    'codecov.SHA256SUM',
    'codecov.SHA256SUM.sig',
    'coverage-summary.json',
    'createdFiles.lst',
    'fullLocaleNames.lst',
    'include.lst',
    'inputFiles.lst',
    'phpunit-code-coverage.xml',
    'phpunit-coverage.xml',
    'remapInstanbul.coverage*.json',
    'scoverage.measurements.*',
    'test-result-*-codecoverage.json',
    'test_*_coverage.txt',
    'testrunner-coverage*',
    '*.*js',
    '.yarn',
    '*.zip',
  ]
}

coverageFilePatterns = [
  '*coverage*.*',
  'nosetests.xml',
  'jacoco*.xml',
  'clover.xml',
  'report.xml',
  '*.codecov.!(exe)',
  'codecov.!(exe)',
  '*cobertura.xml',
  'excoveralls.json',
  'luacov.report.out',
  'coverage-final.json',
  'naxsi.console.log',
  'lcov.console.log',
  'lcov.dat',
  '*.lcov',
  '*.clover',
  'cover.out',
  'gcov.console.log',
  '*.gcov',
  '*.lst',
  'test_cov.xml',
]

function getBlocklist(){
  return [...manualBlocklist(), ...globBlocklist()].map(globstar)
}

function getCoverageFiles(
  projectRoot,
  followSymbolicLinks= true,
) {
  const globstar = (pattern) => `**/${pattern}`

  return glob(coverageFilePatterns.map((pattern) => {
    const parts = []
    parts.push(globstar(pattern))

    return parts.join(EMPTY_STRING)
  }), {
    cwd: projectRoot,
    dot: true,
    followSymbolicLinks,
    ignore: getBlocklist(),
    suppressErrors: true,
  })
}

function fetchGitRoot() {
  const currentWorkingDirectory = process.cwd()
  try {
    const gitRoot = runExternalProgram('git', ['rev-parse', '--show-toplevel'])
    return (gitRoot != "" ? gitRoot : currentWorkingDirectory)
  } catch (error) {
    console.log(`Error fetching git root. Defaulting to ${currentWorkingDirectory}. Please try using the -R flag. ${error}`)
    return currentWorkingDirectory
  }
}

coverageFiles = getCoverageFiles(fetchGitRoot())

console.log(`${coverageFiles}`)
