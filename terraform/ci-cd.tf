# ci-cd.tf

provider "github" {
  token = "seu_token"
}

resource "github_repository" "nodejs_nest_project" {
  name        = "Gerador-de-Conteudo"
  description = "Gerador de Conteúdo"
  visibility  = "public" # ou "private"

  auto_init    = true
  gitignore_template = "Node" # Adiciona um .gitignore para projetos Node.js
  license_template  = "mit" # Adiciona uma licença MIT
}

# Variáveis
variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

