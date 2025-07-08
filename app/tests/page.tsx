"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Navigation } from "@/components/navigation";
import {
  Play,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Save,
  Code,
  Settings,
  FileText,
  Eye,
  Square,
  RotateCcw,
  Monitor,
  Smartphone,
  Terminal,
} from "lucide-react";
import { CodeEditor } from "@/components/code-editor";

interface Test {
  id: string;
  name: string;
  description: string;
  status: "passed" | "failed" | "pending" | "running";
  lastRun: Date;
  duration: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  code: string;
}

export default function TestsPage() {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(
    null
  );

  // Verifica se há um projeto selecionado
  useEffect(() => {
    const projectName = localStorage.getItem("selectedProjectName");
    setSelectedProjectName(projectName);
  }, []);

  // Dados mock
  const [tests, setTests] = useState<Test[]>([
    {
      id: "1",
      name: "Login Flow Test",
      description: "Testa o fluxo completo de login do usuário",
      status: "passed",
      lastRun: new Date(),
      duration: "1.2s",
      category: "Authentication",
      priority: "High",
      code: `import { test, expect } from '@playwright/test';

test('user login flow', async ({ page }) => {
  // Navigate to login page
  await page.goto('/login');
  
  // Fill user credentials
  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  
  // Submit login form
  await page.click('[data-testid="login-button"]');
  
  // Verify successful redirect
  await expect(page).toHaveURL('/dashboard');
  
  // Verify welcome message appears
  await expect(page.getByTestId('welcome-message')).toBeVisible();
  await expect(page.getByTestId('welcome-message')).toContainText('Welcome back');
  
  // Verify user menu is available
  await expect(page.getByRole('button', { name: 'User Menu' })).toBeVisible();
});`,
    },
    {
      id: "2",
      name: "Checkout Process",
      description: "Valida o processo de checkout e pagamento",
      status: "passed",
      lastRun: new Date(),
      duration: "3.4s",
      category: "E-commerce",
      priority: "Critical",
      code: `import { test, expect } from '@playwright/test';

test('e-commerce checkout process', async ({ page }) => {
  // Add product to cart
  await page.goto('/products/laptop-pro');
  await page.click('[data-testid="add-to-cart"]');
  
  // Navigate to cart
  await page.goto('/cart');
  await expect(page.getByText('Laptop Pro')).toBeVisible();
  
  // Proceed to checkout
  await page.click('[data-testid="checkout-button"]');
  
  // Fill shipping information
  await page.fill('[data-testid="first-name"]', 'John');
  await page.fill('[data-testid="last-name"]', 'Doe');
  await page.fill('[data-testid="address"]', '123 Main St');
  await page.fill('[data-testid="city"]', 'New York');
  await page.selectOption('[data-testid="state"]', 'NY');
  await page.fill('[data-testid="zip"]', '10001');
  
  // Fill payment information  
  await page.fill('[data-testid="card-number"]', '4111111111111111');
  await page.fill('[data-testid="expiry"]', '12/25');
  await page.fill('[data-testid="cvv"]', '123');
  
  // Complete order
  await page.click('[data-testid="place-order"]');
  
  // Verify order confirmation
  await expect(page.getByText('Order Confirmed')).toBeVisible();
  await expect(page).toHaveURL(/.*\/order-confirmation/);
});`,
    },
    {
      id: "3",
      name: "User Registration",
      description: "Testa o cadastro de novos usuários",
      status: "failed",
      lastRun: new Date(),
      duration: "2.1s",
      category: "Authentication",
      priority: "High",
      code: `import { test, expect } from '@playwright/test';

test('user registration', async ({ page }) => {
  await page.goto('/register');
  await page.fill('#email', 'newuser@example.com');
  await page.fill('#password', 'password123');
  await page.fill('#confirmPassword', 'password123');
  await page.click('#register-btn');
  await expect(page).toHaveURL('/welcome');
});`,
    },
  ]);

  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || test.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "running":
        return <Play className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      passed: "default" as const,
      failed: "destructive" as const,
      pending: "secondary" as const,
      running: "default" as const,
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  const handleCreateTest = () => {
    setSelectedTest({
      id: "",
      name: "",
      description: "",
      status: "pending",
      lastRun: new Date(),
      duration: "-",
      category: "",
      priority: "Medium",
      code: `import { test, expect } from '@playwright/test';

test('novo teste', async ({ page }) => {
  // Escreva seu teste aqui
});`,
    });
    setActiveTab("editor");
  };

  const handleEditTest = (test: Test) => {
    setSelectedTest(test);
    setActiveTab("editor");
  };

  const handleRunTest = (testId: string) => {
    setIsRunning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleSaveTest = () => {
    if (selectedTest) {
      if (selectedTest.id) {
        // Atualizar teste existente
        setTests((prev) =>
          prev.map((test) =>
            test.id === selectedTest.id ? selectedTest : test
          )
        );
      } else {
        // Criar novo teste
        const newTest = {
          ...selectedTest,
          id: Date.now().toString(),
          lastRun: new Date(),
        };
        setTests((prev) => [...prev, newTest]);
      }
      setActiveTab("list");
      setSelectedTest(null);
    }
  };

  return (
    <Navigation>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {selectedProjectName
                ? `Testes - ${selectedProjectName}`
                : "Testes"}
            </h1>
            <p className="text-muted-foreground">
              {selectedProjectName
                ? `Gerencie os testes do projeto ${selectedProjectName}`
                : "Gerencie, edite e execute seus testes automatizados"}
            </p>
          </div>
          <Button onClick={handleCreateTest}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Teste
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list">Lista de Testes</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="runner">Executor</TabsTrigger>
          </TabsList>

          {/* Lista de Testes */}
          <TabsContent value="list" className="space-y-4">
            <Card className="tests-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Casos de Teste</CardTitle>
                    <CardDescription>
                      Gerencie todos os seus casos de teste
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar testes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="passed">Passou</SelectItem>
                        <SelectItem value="failed">Falhou</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Duração</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.map((test) => (
                      <TableRow key={test.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(test.status)}
                            {getStatusBadge(test.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{test.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {test.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{test.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              test.priority === "Critical"
                                ? "destructive"
                                : test.priority === "High"
                                ? "default"
                                : test.priority === "Medium"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {test.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{test.duration}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleRunTest(test.id)}
                              disabled={isRunning}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditTest(test)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Editor de Testes */}
          <TabsContent value="editor" className="space-y-4">
            {selectedTest && (
              <Card className="tests-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Editor de Teste</CardTitle>
                      <CardDescription>
                        {selectedTest.id
                          ? "Editando teste existente"
                          : "Criando novo teste"}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button onClick={handleSaveTest}>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="test-name">Nome do Teste</Label>
                      <Input
                        id="test-name"
                        value={selectedTest.name}
                        onChange={(e) =>
                          setSelectedTest({
                            ...selectedTest,
                            name: e.target.value,
                          })
                        }
                        placeholder="Nome do teste"
                      />
                    </div>
                    <div>
                      <Label htmlFor="test-category">Categoria</Label>
                      <Select
                        value={selectedTest.category}
                        onValueChange={(value) =>
                          setSelectedTest({ ...selectedTest, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Authentication">
                            Authentication
                          </SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="Search">Search</SelectItem>
                          <SelectItem value="User Management">
                            User Management
                          </SelectItem>
                          <SelectItem value="API">API</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="test-priority">Prioridade</Label>
                      <Select
                        value={selectedTest.priority}
                        onValueChange={(value) =>
                          setSelectedTest({
                            ...selectedTest,
                            priority: value as any,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="test-description">Descrição</Label>
                    <Textarea
                      id="test-description"
                      value={selectedTest.description}
                      onChange={(e) =>
                        setSelectedTest({
                          ...selectedTest,
                          description: e.target.value,
                        })
                      }
                      placeholder="Descreva o que este teste faz"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Código do Teste</Label>
                    <div className="mt-2">
                      <CodeEditor
                        value={selectedTest.code}
                        onChange={(value) =>
                          setSelectedTest({ ...selectedTest, code: value })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Executor de Testes */}
          <TabsContent value="runner" className="space-y-4">
            <Card className="tests-card">
              <CardHeader>
                <CardTitle>Executor de Testes</CardTitle>
                <CardDescription>
                  Execute testes individuais ou suítes completas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Controles */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {!isRunning ? (
                        <Button onClick={() => handleRunTest("all")}>
                          <Play className="w-4 h-4 mr-2" />
                          Executar Todos os Testes
                        </Button>
                      ) : (
                        <Button
                          variant="destructive"
                          onClick={() => setIsRunning(false)}
                        >
                          <Square className="w-4 h-4 mr-2" />
                          Parar Execução
                        </Button>
                      )}
                      <Button variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Executar Novamente
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Monitor className="w-4 h-4 mr-1" />
                        Desktop
                      </Button>
                      <Button variant="outline" size="sm">
                        <Smartphone className="w-4 h-4 mr-1" />
                        Mobile
                      </Button>
                    </div>
                  </div>

                  {/* Progress */}
                  {isRunning && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Executando testes...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}

                  {/* Resultados */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="tests-card">
                      <CardHeader>
                        <CardTitle className="text-base">
                          Execução Atual
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {tests.slice(0, 3).map((test, index) => (
                            <div
                              key={test.id}
                              className="flex items-center gap-3 p-2 border rounded"
                            >
                              {getStatusIcon(
                                index === 0 && isRunning
                                  ? "running"
                                  : test.status
                              )}
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {test.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {test.duration}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="tests-card">
                      <CardHeader>
                        <CardTitle className="text-base">Console</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-40">
                          <div className="space-y-1 text-xs font-mono">
                            <div className="text-green-600">
                              ✓ Login Flow Test - PASSOU (1.2s)
                            </div>
                            <div className="text-green-600">
                              ✓ Checkout Process - PASSOU (3.4s)
                            </div>
                            <div className="text-red-600">
                              ✗ User Registration - FALHOU (2.1s)
                            </div>
                            <div className="text-gray-600">
                              {" "}
                              Erro: Element not found:
                              [data-testid='submit-button']
                            </div>
                            {isRunning && (
                              <div className="text-blue-600">
                                → Executando Product Search...
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Navigation>
  );
}
