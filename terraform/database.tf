# Define o provedor AWS e especifica a região onde os recursos serão criados.
provider "aws" {
  region = "sa-east-1"
}

# Grupo de segurança para permitir acesso ao RDS
resource "aws_security_group" "rds_security_group" {
  name        = "rds_security_group"
  description = "Allow all inbound traffic to PostgreSQL"
  vpc_id      = "vpc-00cf985e1247aaad7"  # Substitua pelo ID da sua VPC

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Permite todos os IPs para fins de teste
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds_security_group"
  }
}

# Recurso que cria um grupo de subnets para o banco de dados RDS
resource "aws_db_subnet_group" "my_db_subnet_group" {
  name       = "my-db-subnet-group"
  subnet_ids = [
    "subnet-0cc06926ca82a7409",
    "subnet-04802ddca935098e3"
  ]

  tags = {
    Name = "My DB subnet group"
  }
}

# Recurso que cria uma instância RDS com PostgreSQL
resource "aws_db_instance" "my_postgres_db" {
  identifier           = "my-postgres-db"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "11.22"
  instance_class       = "db.t3.micro"
  db_name              = "controle"
  username             = "seu_user"
  password             = "sua_senha"
  parameter_group_name = "default.postgres11"
  skip_final_snapshot  = true
  publicly_accessible  = true
  vpc_security_group_ids = [aws_security_group.rds_security_group.id]
  db_subnet_group_name   = aws_db_subnet_group.my_db_subnet_group.name
}

# Script SQL para criar as tabelas 
resource "local_file" "create_tables_sql" {
  content  = <<EOF
CREATE TABLE fluxo (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

CREATE TABLE materias (
    id INT PRIMARY KEY,
    importancia CHAR(3),
    link TEXT,
    observacoes VARCHAR(255)
);
CREATE TABLE assunto_noticia (
    id INT PRIMARY KEY,
    nome VARCHAR(255) not null,
    nivel_de_atuacao VARCHAR(255) not null
);
CREATE TABLE origem_noticia (
    id INT PRIMARY KEY,
    nome VARCHAR(255) not null,
    nivel_de_atuacao VARCHAR(255) not null
);
CREATE TABLE noticia_original (
    id INT PRIMARY KEY,
    id_origem_noticia int not null,
    descricao VARCHAR(255),
    texto TEXT,
    manchete VARCHAR(255),
    link VARCHAR(255),
    id_assunto int not null,
    data date,
    publicacao char(1),
    CONSTRAINT fk_origem_noticia FOREIGN KEY (id_origem_noticia)
    REFERENCES origem_noticia(id),
    CONSTRAINT fk_origem_assunto FOREIGN KEY (id_assunto)
    REFERENCES assunto_noticia(id)
);

CREATE TABLE noticias (
    id INT PRIMARY KEY,
    id_noticia_original int not null,
    texto text,
    manchete VARCHAR(255),
    data_vinculo date,
    id_assunto int not null, 
    imagem VARCHAR(255),
    imagem_secundaria VARCHAR(255),
    video VARCHAR(255),
    CONSTRAINT fk_noticia_origem FOREIGN KEY (id_noticia_original)
    REFERENCES noticia_original(id),
    CONSTRAINT fk_noticia_assunto FOREIGN KEY (id_assunto)
    REFERENCES assunto_noticia(id)
);
EOF
  filename = "${path.module}/create_tables.sql"
}

# Executa o script SQL após o banco de dados estar disponível
resource "null_resource" "apply_tables_sql" {
  provisioner "local-exec" {
    command = "psql --host=my-postgres-db.sua_instancia.rds.amazonaws.com --port=5432 --username=seu_user --dbname=controle -f ${local_file.create_tables_sql.filename}"
    environment = {
      PGPASSWORD = "sua_senha"
    }
  }

  depends_on = [aws_db_instance.my_postgres_db]
}

# Saída que exibe o endpoint do banco de dados provisionado
output "db_instance_endpoint" {
  value = aws_db_instance.my_postgres_db.endpoint
}
