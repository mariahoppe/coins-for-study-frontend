
import React, { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Calendar, Coins, GraduationCap, Users, BookOpen, Settings, HelpCircle, Video, Award, BarChart2, LogOut } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const VIOLET = "#7c3aed";

function SectionHeader({ icon: Icon, title, description }: { icon: any; title: string; description?: string }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="rounded-2xl p-2 shadow-sm bg-violet-600 text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h2 className="text-xl font-semibold leading-tight">{title}</h2>
        {description ? <p className="text-muted-foreground text-sm mt-0.5">{description}</p> : null}
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, hint, cta, onClick }: { icon: any; title: string; hint: string; cta?: string; onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-10 text-center">
      <Icon className="h-10 w-10 mb-2" />
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground mb-4">{hint}</p>
      {cta ? (
        <Button onClick={onClick} className="rounded-2xl bg-violet-600 hover:bg-violet-700 text-white">{cta}</Button>
      ) : null}
    </div>
  );
}

const DEMO_SUBJECTS = [
  { id: "mat", name: "Matematica" },
  { id: "por", name: "Portugues" },
  { id: "his", name: "Historia" },
  { id: "bio", name: "Biologia" },
];

const DEMO_ACTIVITIES = [
  { id: "a1", subject: "Matematica", title: "Revisao - Funcoes", deadline: "2025-10-01", coins: 10, status: "pendente" },
  { id: "a2", subject: "Historia", title: "Resumo - Era Vargas", deadline: "2025-10-03", coins: 8, status: "enviado" },
  { id: "a3", subject: "Biologia", title: "Quiz - Genetica", deadline: "2025-10-07", coins: 12, status: "corrigida" },
];

const DEMO_NOTES = [
  { subject: "Matematica", activity: "Funcoes", grade: 8.2, weight: 2 },
  { subject: "Historia", activity: "Era Vargas", grade: 7.0, weight: 1 },
  { subject: "Biologia", activity: "Genetica", grade: 9.1, weight: 2 },
];

const DEMO_PERFORMANCE = [
  { name: "Abr", valor: 62 },
  { name: "Mai", valor: 68 },
  { name: "Jun", valor: 74 },
  { name: "Jul", valor: 79 },
  { name: "Ago", valor: 83 },
  { name: "Set", valor: 86 },
];

function TopBar({ user, onLogout, onRoleSwitch }: { user: { name: string; role: string }; onLogout: () => void; onRoleSwitch: (r: string)=>void }) {
  return (
    <div className="sticky top-0 z-10 mb-6 flex items-center justify-between rounded-2xl border border-violet-200/40 bg-white/80 p-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-sm">
          <Coins className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Coins for Study</div>
          <div className="text-xs text-gray-500">Revisao espacada + gamificacao</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={user.role}
          onChange={(e)=>onRoleSwitch(e.target.value)}
          className="rounded-2xl border px-3 py-1.5"
        >
          <option value="student">Aluno</option>
          <option value="teacher">Professor</option>
          <option value="admin">Administrador</option>
        </select>
        <span className="inline-flex items-center rounded-2xl bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">{user.name}</span>
        <Button variant="outline" className="rounded-2xl" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4"/>Sair
        </Button>
      </div>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      {children}
    </div>
  );
}

function Login({ onSubmit }: { onSubmit: (u: {name: string; role: string}) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  function handleLogin() {
    if (!email || !password) {
      setError("Preencha email e senha.");
      return;
    }
    setError("");
    onSubmit({ name: email.split("@")[0] || "aluno", role });
  }

  return (
    <Shell>
      <div className="mx-auto max-w-md">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Acessar plataforma</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>Email</Label>
            <Input placeholder="nome@escola.edu" value={email} onChange={(e)=>setEmail(e.target.value)} className="rounded-2xl"/>
            <Label>Senha</Label>
            <Input type="password" placeholder="********" value={password} onChange={(e)=>setPassword(e.target.value)} className="rounded-2xl"/>
            <div>
              <Label>Perfil</Label>
              <select value={role} onChange={(e)=>setRole(e.target.value)} className="mt-1 w-full rounded-2xl border px-3 py-2">
                <option value="student">Aluno</option>
                <option value="teacher">Professor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button className="w-full rounded-2xl">Entrar</Button>
            <Button variant="ghost" className="w-full rounded-2xl" onClick={handleLogin}>Confirmar Login</Button>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}

function StudentDashboard() {
  const [tab, setTab] = useState("atividades");
  const [selectedActivity, setSelectedActivity] = useState<any | null>(null);
  const [coins, setCoins] = useState<Record<string, number>>({ Matematica: 18, Historia: 12, Biologia: 24, Portugues: 6 });
  const totalCoins = Object.values(coins).reduce((a,b)=>a+b,0);

  function submitActivity(id: string) {
    setSelectedActivity(null);
    const act = DEMO_ACTIVITIES.find(a=>a.id===id);
    if (act) setCoins((prev)=>({ ...prev, [act.subject]: (prev[act.subject]||0) + act.coins }));
  }

  return (
    <div className="space-y-6">
      <SectionHeader icon={GraduationCap} title="Area do Aluno" description="Revisoes, notas e troca de moedas por pontos."/>

      <div className="grid gap-4 md:grid-cols-12">
        <Card className="rounded-2xl md:col-span-3 bg-gradient-to-br from-violet-600 to-violet-500 text-white">
          <CardContent className="p-4">
            <div className="opacity-90 text-sm">Carteira de Moedas</div>
            <div className="flex items-end justify-between">
              <div className="text-4xl font-semibold">{totalCoins}</div>
              <div className="rounded-2xl bg-white/15 p-2"><Coins className="h-6 w-6"/></div>
            </div>
            <p className="text-xs mt-2 opacity-90">Soma por disciplina</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl md:col-span-6">
          <CardContent className="p-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DEMO_PERFORMANCE}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={VIOLET} stopOpacity={0.35}/>
                    <stop offset="95%" stopColor={VIOLET} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="valor" stroke={VIOLET} strokeWidth={2} fillOpacity={1} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-2xl md:col-span-3">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Streak de estudos</div>
            <div className="mt-1 text-3xl font-semibold">7 dias</div>
            <div className="mt-3 h-2 w-full rounded-full bg-violet-100">
              <div className="h-2 rounded-full bg-violet-600" style={{ width: "70%" }} />
            </div>
            <p className="text-xs text-gray-500 mt-2">Voce estudou 5 de 7 dias.</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-2xl">
          <TabsTrigger value="atividades" className="rounded-2xl">Atividades</TabsTrigger>
          <TabsTrigger value="notas" className="rounded-2xl">Notas</TabsTrigger>
          <TabsTrigger value="videoaulas" className="rounded-2xl">Videoaulas</TabsTrigger>
          <TabsTrigger value="resumos" className="rounded-2xl">Resumos</TabsTrigger>
          <TabsTrigger value="comprar" className="rounded-2xl">Comprar Pontos</TabsTrigger>
          <TabsTrigger value="frequencia" className="rounded-2xl">Frequencia</TabsTrigger>
          <TabsTrigger value="perfil" className="rounded-2xl">Perfil</TabsTrigger>
          <TabsTrigger value="ajuda" className="rounded-2xl">Ajuda</TabsTrigger>
        </TabsList>

        <TabsContent value="atividades" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <SectionHeader icon={Calendar} title="Atividades" description="Envie revisoes e colete moedas."/>

              <div className="mb-4 rounded-2xl border p-4 bg-violet-50/40">
                <div className="font-semibold">Revisao espacada (Ebbinghaus)</div>
                <p className="text-sm text-gray-600">Sugestao de calendario: 1d, 3d, 7d, 15d.</p>
                <div className="mt-2 grid gap-2 md:grid-cols-4 text-sm">
                  {[{dia: "Dia 1", feito: true},{dia: "Dia 3", feito: false},{dia: "Dia 7", feito: false},{dia: "Dia 15", feito: false}].map((et, idx)=> (
                    <label key={idx} className="flex items-center gap-2 rounded-xl border bg-white p-2">
                      <input type="checkbox" defaultChecked={et.feito} className="accent-violet-600"/>
                      <span>{et.dia}</span>
                    </label>
                  ))}
                </div>
                <Button className="mt-3 rounded-2xl">Gerar revisao de hoje</Button>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {DEMO_ACTIVITIES.map((a)=> (
                  <div key={a.id} className="rounded-2xl border p-4">
                    <div className="text-sm text-gray-500">{a.subject}</div>
                    <div className="font-semibold">{a.title}</div>
                    <div className="text-xs mt-1">Prazo: {a.deadline}</div>
                    <div className="text-xs">Moedas: {a.coins}</div>
                    <Badge className="mt-2 rounded-2xl">{a.status}</Badge>
                    <div className="mt-3 flex gap-2">
                      <Button className="rounded-2xl" onClick={()=>setSelectedActivity(a)}>Abrir</Button>
                      <Button variant="outline" className="rounded-2xl">Instrucoes</Button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedActivity ? (
                <div className="mt-4 rounded-2xl border p-4">
                  <div className="font-semibold mb-2">{selectedActivity.title}</div>
                  <p className="text-sm text-gray-600">Responda as 5 questoes (demo).</p>
                  <div className="grid gap-3 mt-3">
                    {[1,2,3,4,5].map((i)=> (
                      <div key={i}>
                        <Label>Pergunta {i}</Label>
                        <Input className="rounded-2xl" placeholder={`Resposta ${i}`}/>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="rounded-2xl" onClick={()=>submitActivity(selectedActivity.id)}>Enviar revisao</Button>
                    <Button variant="outline" className="rounded-2xl" onClick={()=>setSelectedActivity(null)}>Cancelar</Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notas" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <SectionHeader icon={BarChart2} title="Minhas notas" description="Medias por atividade."/>
              <div className="rounded-2xl overflow-hidden border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Disciplina</th>
                      <th className="p-3 text-left">Atividade</th>
                      <th className="p-3 text-left">Nota</th>
                      <th className="p-3 text-left">Peso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEMO_NOTES.map((n, idx)=> (
                      <tr key={idx} className="border-t">
                        <td className="p-3">{n.subject}</td>
                        <td className="p-3">{n.activity}</td>
                        <td className="p-3">{n.grade.toFixed(1)}</td>
                        <td className="p-3">{n.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videoaulas" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <SectionHeader icon={Video} title="Videoaulas" description="Progresso salvo automaticamente."/>
              <EmptyState icon={Video} title="Sem videoaulas" hint="Quando os professores publicarem, aparecem aqui."/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resumos" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <SectionHeader icon={BookOpen} title="Resumos" description="Leitura e download."/>
              <div className="grid gap-3 md:grid-cols-3">
                {DEMO_SUBJECTS.map((s)=> (
                  <div key={s.id} className="rounded-2xl border p-4">
                    <div className="text-sm text-gray-500">{s.name}</div>
                    <div className="font-semibold">Resumo mais recente</div>
                    <Button variant="outline" className="mt-3 rounded-2xl">Ler</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comprar" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-4">
              <SectionHeader icon={Award} title="Comprar pontos" description="Converta moedas em pontos."/>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(coins).map(([disc, saldo])=> (
                  <div key={disc} className="rounded-2xl border p-4">
                    <div className="font-semibold">{disc}</div>
                    <div className="text-sm text-gray-500">Saldo: {saldo} moedas</div>
                    <div className="mt-3 flex items-center gap-2">
                      <Input type="number" placeholder="Qtd. pontos" className="rounded-2xl"/>
                      <Button className="rounded-2xl">Comprar</Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Preco definido pelo professor.</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequencia" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <SectionHeader icon={Users} title="Frequencia" description="Acompanhe presenca por disciplina."/>
              <div className="rounded-2xl overflow-hidden border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Disciplina</th>
                      <th className="p-3 text-left">Presencas</th>
                      <th className="p-3 text-left">Faltas</th>
                      <th className="p-3 text-left">% Presenca</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DEMO_SUBJECTS.map((s, idx)=> (
                      <tr key={s.id} className="border-t">
                        <td className="p-3">{s.name}</td>
                        <td className="p-3">{18+idx}</td>
                        <td className="p-3">2</td>
                        <td className="p-3">{Math.round(((18+idx)/20)*100)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perfil" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-3">
              <SectionHeader icon={Settings} title="Meu perfil" description="Atualize seus dados."/>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <Label>Nome</Label>
                  <Input className="rounded-2xl" defaultValue="Aluno Demo"/>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input className="rounded-2xl" defaultValue="aluno@escola.edu"/>
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input className="rounded-2xl" placeholder="(xx) xxxxx-xxxx"/>
                </div>
                <div>
                  <Label>Senha</Label>
                  <Input className="rounded-2xl" type="password" defaultValue="********"/>
                </div>
              </div>
              <Button className="rounded-2xl">Salvar alteracoes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ajuda" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-4">
              <SectionHeader icon={HelpCircle} title="Ajuda" description="Fale com o professor, veja FAQs ou suporte."/>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border p-4">
                  <div className="font-semibold">Pergunte ao professor</div>
                  <select className="rounded-2xl border px-3 py-2 mt-2">
                    {DEMO_SUBJECTS.map((s)=> (<option key={s.id} value={s.id}>{s.name}</option>))}
                  </select>
                  <Textarea className="rounded-2xl mt-3" placeholder="Escreva sua duvida"/>
                  <Button className="mt-3 rounded-2xl">Enviar</Button>
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="font-semibold">FAQ</div>
                  <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
                    <li>Como ganho moedas?</li>
                    <li>Quando posso comprar pontos?</li>
                    <li>Quem define os precos?</li>
                  </ul>
                </div>
                <div className="rounded-2xl border p-4">
                  <div className="font-semibold">Suporte tecnico</div>
                  <p className="text-sm text-gray-600">Descreva o problema.</p>
                  <Textarea className="rounded-2xl mt-3" placeholder="Mensagem"/>
                  <Button className="mt-3 rounded-2xl" variant="outline">Solicitar suporte</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TeacherDashboard() {
  const [tab, setTab] = useState("conteudo");
  const [priceBySubject, setPriceBySubject] = useState<Record<string, number>>({ Matematica: 5, Historia: 3, Biologia: 4, Portugues: 2 });
  const [pointsAvailable, setPointsAvailable] = useState<Record<string, number>>({ Matematica: 100, Historia: 80, Biologia: 60, Portugues: 40 });
  const [coinsPerActivity, setCoinsPerActivity] = useState<Record<string, number>>({ a1: 10, a2: 8, a3: 12 });

  return (
    <div className="space-y-6">
      <SectionHeader icon={GraduationCap} title="Area do Professor" description="Gerencie conteudos, moedas e pontos."/>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-2xl">
          <TabsTrigger value="conteudo" className="rounded-2xl">Revisoes</TabsTrigger>
          <TabsTrigger value="notas" className="rounded-2xl">Notas</TabsTrigger>
          <TabsTrigger value="desempenho" className="rounded-2xl">Desempenho</TabsTrigger>
          <TabsTrigger value="pontos" className="rounded-2xl">Pontos e Precos</TabsTrigger>
          <TabsTrigger value="moedas" className="rounded-2xl">Moedas por Atividade</TabsTrigger>
        </TabsList>

        <TabsContent value="conteudo" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-3">
              <SectionHeader icon={BookOpen} title="Publicar conteudo" description="Crie revisoes, resumos e agende publicacoes."/>
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <Label>Disciplina</Label>
                  <select className="rounded-2xl border px-3 py-2 mt-1">
                    {DEMO_SUBJECTS.map((s)=> (<option key={s.id} value={s.id}>{s.name}</option>))}
                  </select>
                </div>
                <div>
                  <Label>Titulo</Label>
                  <Input className="rounded-2xl" placeholder="Ex.: Revisao - Funcoes"/>
                </div>
                <div>
                  <Label>Agendar para</Label>
                  <Input className="rounded-2xl" type="date"/>
                </div>
              </div>
              <div>
                <Label>Conteudo</Label>
                <Textarea className="rounded-2xl" placeholder="Descricao, links, anexos"/>
              </div>
              <div className="flex gap-2">
                <Button className="rounded-2xl">Publicar agora</Button>
                <Button variant="outline" className="rounded-2xl">Agendar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notas" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <SectionHeader icon={BarChart2} title="Notas dos alunos" description="Filtre por turma, aluno ou avaliacao."/>
              <div className="rounded-2xl overflow-hidden border">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left">Aluno</th>
                      <th className="p-3 text-left">Atividade</th>
                      <th className="p-3 text-left">Nota</th>
                      <th className="p-3 text-left">Acoes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Ana","Bruno","Carla","Diego"].map((aluno, i)=> (
                      <tr key={aluno} className="border-t">
                        <td className="p-3">{aluno}</td>
                        <td className="p-3">Revisao {i+1}</td>
                        <td className="p-3">{(6+i*0.8).toFixed(1)}</td>
                        <td className="p-3"><Button variant="outline" className="rounded-2xl" size="sm">Marcar</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desempenho" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <SectionHeader icon={Users} title="Desempenho por turma" description="Exportavel em CSV/PDF."/>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={DEMO_PERFORMANCE}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="valor" stroke={VIOLET} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" className="rounded-2xl">Exportar CSV</Button>
                <Button variant="outline" className="rounded-2xl">Exportar PDF</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pontos" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-4">
              <SectionHeader icon={Award} title="Configurar pontos e precos" description="Defina total e preco em moedas."/>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.keys(priceBySubject).map((disc)=> (
                  <div key={disc} className="rounded-2xl border p-4 space-y-2">
                    <div className="font-semibold">{disc}</div>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <Label>Preco (moedas por 1 ponto)</Label>
                        <Input className="rounded-2xl" type="number" value={priceBySubject[disc]} onChange={(e)=>setPriceBySubject({...priceBySubject, [disc]: Number(e.target.value||0)})}/>
                      </div>
                      <div>
                        <Label>Pontos disponiveis</Label>
                        <Input className="rounded-2xl" type="number" value={pointsAvailable[disc]} onChange={(e)=>setPointsAvailable({...pointsAvailable, [disc]: Number(e.target.value||0)})}/>
                      </div>
                    </div>
                    <Button className="rounded-2xl">Salvar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moedas" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-3">
              <SectionHeader icon={Coins} title="Moedas por atividade" description="Defina a quantidade por atividade."/>
              <div className="grid gap-3 md:grid-cols-3">
                {DEMO_ACTIVITIES.map((a)=> (
                  <div key={a.id} className="rounded-2xl border p-4">
                    <div className="font-semibold">{a.title}</div>
                    <Label className="text-xs text-gray-500">Moedas</Label>
                    <Input className="rounded-2xl" type="number" value={coinsPerActivity[a.id] ?? a.coins} onChange={(e)=>setCoinsPerActivity({...coinsPerActivity, [a.id]: Number(e.target.value||0)})}/>
                    <Button className="mt-2 rounded-2xl">Aplicar</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AdminDashboard() {
  const [tab, setTab] = useState("modelo");
  const [teachingModel, setTeachingModel] = useState("medio");
  const [subjects, setSubjects] = useState([...DEMO_SUBJECTS]);
  const [expiry, setExpiry] = useState(30);
  const [separateByDiscipline, setSeparateByDiscipline] = useState(true);
  const [thresholds, setThresholds] = useState<Record<string, number>>({ Matematica: 7, Historia: 6, Biologia: 7, Portugues: 6 });

  function addSubject() {
    const name = prompt("Nome da disciplina");
    if (!name) return;
    setSubjects((prev)=> [...prev, { id: name.toLowerCase().slice(0,3)+prev.length, name }]);
  }

  return (
    <div className="space-y-6">
      <SectionHeader icon={Settings} title="Painel do Administrador" description="Configure modelos, disciplinas, prazos e usuarios."/>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="rounded-2xl">
          <TabsTrigger value="modelo" className="rounded-2xl">Modelo</TabsTrigger>
          <TabsTrigger value="disciplinas" className="rounded-2xl">Disciplinas</TabsTrigger>
          <TabsTrigger value="prazo" className="rounded-2xl">Prazo das moedas</TabsTrigger>
          <TabsTrigger value="separacao" className="rounded-2xl">Separacao por disciplina</TabsTrigger>
          <TabsTrigger value="medias" className="rounded-2xl">Medias</TabsTrigger>
          <TabsTrigger value="usuarios" className="rounded-2xl">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="modelo" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-3">
              <SectionHeader icon={GraduationCap} title="Configurar modelo" description="Fundamental, Medio, Tecnico ou personalizado."/>
              <select value={teachingModel} onChange={(e)=>setTeachingModel(e.target.value)} className="rounded-2xl border px-3 py-2 w-64">
                <option value="fundamental">Ensino Fundamental</option>
                <option value="medio">Ensino Medio</option>
                <option value="tecnico">Ensino Tecnico</option>
                <option value="personalizado">Personalizado</option>
              </select>
              <Button className="rounded-2xl">Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disciplinas" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4">
              <SectionHeader icon={BookOpen} title="Gerenciar disciplinas" description="Criar, editar e associar."/>
              <div className="grid gap-3 md:grid-cols-3">
                {subjects.map((s)=> (
                  <div key={s.id} className="rounded-2xl border p-4">
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-gray-500">Codigo: {s.id}</div>
                    <div className="mt-2 flex gap-2">
                      <Button className="rounded-2xl" variant="outline">Editar</Button>
                      <Button className="rounded-2xl" variant="destructive">Excluir</Button>
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border p-4 flex items-center justify-center">
                  <Button className="rounded-2xl" onClick={addSubject}>Adicionar disciplina</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prazo" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-2">
              <SectionHeader icon={Calendar} title="Prazo de validade" description="Defina expiracao e notificacoes."/>
              <div className="flex items-center gap-3">
                <Input className="w-40 rounded-2xl" type="number" value={expiry} onChange={(e)=>setExpiry(Number(e.target.value||0))}/>
                <span className="text-sm text-gray-600">dias</span>
                <Button className="rounded-2xl">Aplicar</Button>
              </div>
              <p className="text-sm text-gray-600">Alunos serao notificados da data de expiracao.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="separacao" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-2">
              <SectionHeader icon={Coins} title="Separacao por disciplina" description="Impede uso cruzado."/>
              <div className="flex items-center gap-3">
                <Switch checked={separateByDiscipline} onChange={(e)=>setSeparateByDiscipline((e.target as HTMLInputElement).checked)} />
                <span className="text-sm">Ativar separacao</span>
              </div>
              <Button className="rounded-2xl">Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medias" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-4">
              <SectionHeader icon={BarChart2} title="Medias minimas" description="Valores por disciplina."/>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.keys(thresholds).map((disc)=> (
                  <div key={disc} className="rounded-2xl border p-4">
                    <div className="font-semibold">{disc}</div>
                    <Input className="rounded-2xl mt-2 w-40" type="number" step={0.1} value={thresholds[disc]} onChange={(e)=>setThresholds({...thresholds, [disc]: Number(e.target.value||0)})}/>
                  </div>
                ))}
              </div>
              <Button className="rounded-2xl">Salvar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="mt-4">
          <Card className="rounded-2xl">
            <CardContent className="p-4 space-y-4">
              <SectionHeader icon={Users} title="Gerenciar usuarios" description="Cadastro, importacao e permissoes."/>
              <div className="grid gap-4 md:grid-cols-3">
                {["Professores","Alunos","Administradores"].map((tipo)=> (
                  <div key={tipo} className="rounded-2xl border p-4">
                    <div className="font-semibold">{tipo}</div>
                    <div className="mt-2 flex flex-col gap-2">
                      <Button variant="outline" className="rounded-2xl">Cadastrar</Button>
                      <Button variant="outline" className="rounded-2xl">Importar CSV</Button>
                      <Button className="rounded-2xl">Exportar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function CoinsForStudyApp() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  const main = useMemo(() => {
    if (!user) return <Login onSubmit={setUser}/>;
    return (
      <Shell>
        <TopBar user={user} onLogout={()=>setUser(null)} onRoleSwitch={(r)=>setUser((u)=> (u ? { ...u, role: r } : u))}/>
        {user.role === "student" && <StudentDashboard/>}
        {user.role === "teacher" && <TeacherDashboard/>}
        {user.role === "admin" && <AdminDashboard/>}
      </Shell>
    );
  }, [user]);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-violet-50 via-white to-white">
      <div className="mx-auto max-w-7xl py-6 px-4">
        {main}
      </div>
    </div>
  );
}
