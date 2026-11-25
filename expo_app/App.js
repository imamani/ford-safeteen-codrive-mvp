import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  StatusBar,
  NativeModules
} from 'react-native';
import { WebView } from 'react-native-webview';

// Detecta automáticamente la IP de la PC desde la URL de Metro (funciona en cualquier PC y Wi-Fi)
function detectServerUrl() {
  try {
    const scriptURL = NativeModules?.SourceCode?.scriptURL;
    if (scriptURL && typeof scriptURL === 'string') {
      const match = scriptURL.match(/^https?:\/\/([^/:]+)(?::\d+)?/);
      if (match && match[1] && match[1] !== 'localhost' && match[1] !== '127.0.0.1') {
        return `http://${match[1]}:3000`;
      }
    }
  } catch (e) {
    // Fallback silencioso a IP por defecto
  }
  return 'http://192.168.1.100:3000';
}

const DEFAULT_URL = detectServerUrl();

export default function App() {
  const [serverUrl, setServerUrl] = useState(DEFAULT_URL);
  const [inputUrl, setInputUrl] = useState(DEFAULT_URL);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Si después de 12 segundos sigue cargando, ofrecer opciones de diagnóstico
    timeoutRef.current = setTimeout(() => {
      if (loading) {
        setErrorMsg('El servidor tardó más de 12s en responder. Verifica que tu PC y celular estén en el mismo Wi-Fi.');
      }
    }, 12000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loading, serverUrl]);

  const handleRetry = () => {
    setErrorMsg(null);
    setLoading(true);
    setServerUrl(inputUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#050811" />

      <WebView
        key={serverUrl}
        source={{ uri: serverUrl }}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mixedContentMode="always"
        allowFileAccess={true}
        cacheEnabled={false}
        startInLoadingState={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => {
          setLoading(false);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setLoading(false);
          setErrorMsg(nativeEvent.description || 'Error de conexión con el servidor web.');
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setLoading(false);
          setErrorMsg(`Error HTTP ${nativeEvent.statusCode}: No se pudo cargar el prototipo.`);
        }}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#06b6d4" />
            <Text style={styles.loadingTitle}>Iniciando Ford SafeTeen Co-Drive...</Text>
            <Text style={styles.loadingSubtitle}>Conectando a {serverUrl}</Text>
            <TouchableOpacity 
              style={styles.btnSecondary}
              onPress={() => setShowConfig(true)}>
              <Text style={styles.btnSecondaryText}>⚙️ Cambiar IP / Ajustes</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Pantalla de Error / Diagnóstico de Red */}
      {(errorMsg || showConfig) && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Conexión con Ford SafeTeen</Text>
          
          {errorMsg ? (
            <Text style={styles.errorDesc}>{errorMsg}</Text>
          ) : (
            <Text style={styles.errorDesc}>
              Ingresa la dirección IP de tu laptop donde corre el servidor de Node.js:
            </Text>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>URL DEL SERVIDOR WEB:</Text>
            <TextInput
              style={styles.input}
              value={inputUrl}
              onChangeText={setInputUrl}
              placeholder={DEFAULT_URL}
              placeholderTextColor="#64748b"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleRetry}>
              <Text style={styles.primaryButtonText}>Reintentar Conexión</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => { setShowConfig(false); setErrorMsg(null); }}>
              <Text style={styles.cancelButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>💡 Consejos si no conecta:</Text>
            <Text style={styles.infoText}>1. Tu laptop y teléfono deben estar en el mismo Wi-Fi.</Text>
            <Text style={styles.infoText}>2. Verifica que el servidor de tu PC esté corriendo en el puerto 3000.</Text>
            <Text style={styles.infoText}>3. También puedes abrir directo en Chrome de tu teléfono: {serverUrl}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050811',
  },
  webview: {
    flex: 1,
    backgroundColor: '#050811',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#050811',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  loadingSubtitle: {
    color: '#38bdf8',
    fontFamily: 'monospace',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 20,
  },
  btnSecondary: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  btnSecondaryText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 8, 17, 0.98)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    zIndex: 99,
  },
  errorIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  errorTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDesc: {
    color: '#cbd5e1',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#38bdf8',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#0284c7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cancelButton: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  cancelButtonText: {
    color: '#94a3b8',
    fontWeight: 'bold',
    fontSize: 13,
  },
  infoBox: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 14,
    padding: 14,
    width: '100%',
  },
  infoTitle: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  infoText: {
    color: '#94a3b8',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 3,
  },
});
